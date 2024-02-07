require('dotenv').config({ path: './.env' });
import * as BodyParser from 'body-parser';
import * as Cors from 'cors';
import * as CookieParser from 'cookie-parser';
import * as Express from 'express';
import * as Session from 'express-session';
import * as fs from 'fs';
import Helmet from 'helmet';
import * as https from 'https';
import * as path from 'path';
import { Pool } from 'pg';
import * as SGMail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import { AttendeeDatabase } from './postgres/queries/attendee_database';
import { CuisineDatabase } from './postgres/queries/cuisine_database';
import { UserCoverImageDatabase } from
  './postgres/queries/user_cover_image_database';
import { UserEmailUpdateRequestsDatabase } from
  './postgres/queries/user_email_update_requests_database';
import { UserNotificationSettingsDatabase } from
  './postgres/queries/user_notification_settings_database';
import { UserSocialCredentialsDatabase } from
  './postgres/queries/user_social_credentials_database';
import { DeactivateAccountSurveyDatabase } from
  './postgres/queries/deactivate_account_survey_database';
import { DeleteAccountSurveyDatabase } from
  './postgres/queries/delete_account_survey_database';
import { DiningEventDatabase } from './postgres/queries/dining_event_database';
import { LanguageDatabase } from './postgres/queries/language_database';
import { LocationDatabase } from './postgres/queries/location_database';
import { SocialMediaImageDatabase } from
  './postgres/queries/social_media_image_database';
import { UserDatabase } from './postgres/queries/user_database';
import { UserProfileImageDatabase } from
  './postgres/queries/user_profile_image_database';
import { DeactivateAccountSurveyRoutes } from
  './routes/deactivate_account_survey';
import { DeleteAccountSurveyRoutes } from './routes/delete_account_survey';
import { DiningEventRoutes } from './routes/dining_event';
import { SocialMediaImageRoutes } from './routes/social_media_image';
import { StripePaymentRoutes } from './routes/stripe_payments';
import { UserRoutes } from './routes/user';
import { UserProfileImageRoutes } from './routes/user_profile_image';

const pgSession = require('connect-pg-simple')(Session);
const initializePostgres = async (pool, dir, label, tableNames = []) => {
  if (tableNames.length === 0) {
    tableNames = fs.readdirSync(dir).filter(
      f => path.extname(f).toLowerCase() === '.sql').map(f => f.replace('.sql',
      ''));
  }

  for (const value of tableNames) {
    const [isValue, column] = (() => {
      if (label === 'table') {
        return [`SELECT to_regclass('${value}')`, 'to_regclass'];
      } else if (label === 'type') {
        return [`SELECT oid FROM pg_type WHERE typname = '${value}'`, 'oid'];
      } else {
        return [null, null];
      }
    })();

    await new Promise<void>((resolve, reject) => {
      pool.query(isValue, (error, results) => {
        if (error) {
          console.error('Failed to create table', error);
          reject(error);
          return;
        }
        if (results.rows.length == 0 || results.rows[0][column] == null) {
          const query = fs.readFileSync(dir + `${value}.sql`).toString();
          pool.query(query, (error, results) => {
            if (error) {
              console.error(error);
              reject(error);
              return;
            }
          });
        }
        resolve();
      });
    });
  }
};

const baseURL = process.env.NODE_ENV === 'production' ? 
  process.env.PROD_BASE_URL : process.env.LOCAL_BASE_URL;

function runExpress(pool: Pool, config: any) {
  const app = Express();
  const scriptSrcUrls = [
    "'self'",
    'https://www.googletagmanager.com',
    'https://js.stripe.com',
    'https://apis.google.com',
  ];

  const connectSrcUrls = [
    "'self'",
    "https://api.stripe.com",
    "https://checkout.stripe.com",
    "https://www.google-analytics.com",
    "https://js.stripe.com",
  ];

  const formActionUrls = [
    "'self'",
    "https://api.stripe.com"
  ];

  if (process.env.NODE_ENV !== 'production') {
    scriptSrcUrls.push(baseURL);
    connectSrcUrls.push(baseURL);
    formActionUrls.push(baseURL);
  }

  app.use('/api/stripe-webhook', BodyParser.raw({ type: 'application/json' }));

  app.use(Helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: scriptSrcUrls,
        connectSrc: connectSrcUrls,
        scriptSrcAttr: ["'unsafe-inline'", 'https://js.stripe.com'],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        imgSrc: ["'self'", "data:", "https://www.googletagmanager.com"],
        formAction: formActionUrls,
        styleSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  }));

  const Stripe = require('stripe');
  console.log(process.env.STRIPE_SECRET_KEY);
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  app.use(BodyParser.json());
  const frontendUrls = config.frontendUrls;
  app.use(Cors(
    {
      origin: frontendUrls,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204
    }
  ));
  app.use(Express.static('public'));
  app.use(
    BodyParser.urlencoded({
      extended: true
    })
  );
  const sessionConfig = {
    genid: () => {
      return uuidv4();
    },
    store: new pgSession({
      pool: pool,
      tableName: 'user_sessions'
    }),
    secret: config.cookie_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'lax' as 'lax'
    }
  };

  app.set('trust proxy', 1);
  if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true;
  }
  app.use(CookieParser());
  app.use(Session(sessionConfig));
  app.get('/api/google_client_id', (request, response) => {
    let id = '';
    try {
      id = config.google_client_id;
    } catch (error) {
      response.status(500).json({ google_client_id: id, message: 'ERROR' });
      return;
    }
    response.status(200).json({ google_client_id: id });
  });

  SGMail.setApiKey(config.send_grid_api_key);

  const userDatabase = new UserDatabase(pool);
  const userProfileImageDatabase = new UserProfileImageDatabase(pool);
  const userProfileImageRoutes = new UserProfileImageRoutes(app,
    userProfileImageDatabase);
  const userCoverImageDatabase = new UserCoverImageDatabase(pool);
  const attendeeDatabase = new AttendeeDatabase(pool);
  const cuisineDatabase = new CuisineDatabase(pool);
  const languageDatabase = new LanguageDatabase(pool);
  const userSocialCredentialsDatabase = new UserSocialCredentialsDatabase(pool);
  const userEmailUpdateRequestsDatabase = new UserEmailUpdateRequestsDatabase(
    pool);
  const userNotificationSettingsDatabase = new UserNotificationSettingsDatabase(
    pool);
  const userRoutes = new UserRoutes(app, userDatabase, attendeeDatabase,
    userProfileImageDatabase, userCoverImageDatabase, cuisineDatabase,
    languageDatabase, userSocialCredentialsDatabase,
    userEmailUpdateRequestsDatabase, userNotificationSettingsDatabase, SGMail,
    baseURL, pool);
  const locationDatabase = new LocationDatabase(pool);
  const socialMediaImageDatabase = new SocialMediaImageDatabase(pool);
  const socialMediaImageRoutes = new SocialMediaImageRoutes(app,
    socialMediaImageDatabase);
  const deactivateAccountSurveyDatabase = new DeactivateAccountSurveyDatabase(
    pool);
  const deactivateAccountSurveyRoute = new DeactivateAccountSurveyRoutes(app,
    deactivateAccountSurveyDatabase, userDatabase, SGMail);
  const deleteAccountSurveyDatabase = new DeleteAccountSurveyDatabase(pool);
  const deleteAccountSurveyRoute = new DeleteAccountSurveyRoutes(app,
    deleteAccountSurveyDatabase, userDatabase, SGMail);
  const diningEventDatabase = new DiningEventDatabase(pool);
  const diningEventRoutes = new DiningEventRoutes(app, diningEventDatabase,
    userDatabase, attendeeDatabase, userProfileImageDatabase);
  const stripePaymentRoutes = new StripePaymentRoutes(app, stripe, baseURL,
    userDatabase, diningEventDatabase, attendeeDatabase,
    userProfileImageDatabase);

  app.get('*', (request, response, next) => {
    response.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  });

  /** Start the server after initializing the tables */
  const startServer = async () => {
    const path = require('path');
    const typesDir = path.join(__dirname, '../source/postgres/types/');
    const tablesDir = path.join(__dirname, '../source/postgres/tables/');
    try {
      await initializePostgres(pool, typesDir, 'type');
      await initializePostgres(pool, tablesDir, 'table', [
        'users',
        'user_sessions',
        'avatars',
        'user_confirmation_tokens',
        'user_invitation_codes',
        'user_credentials',
        'user_social_credentials',
        'user_profile_images',
        'social_media_images',
        'user_cover_images',
        'cuisines',
        'locations',
        'restaurants',
        'restaurant_cuisines',
        'dining_events',
        'delete_account_survey',
        'deactivate_account_survey',
        'attendees',
        'user_profile_social_accounts',
        'languages',
        'user_languages',
        'user_favourite_cuisines',
        'password_reset_tokens',
        'billing_addresses',
        'user_email_update_requests',
        'stripe_products',
        'stripe_payment_intents',
        'user_notification_settings'
      ]);
      console.log(process.env.LOCAL_BASE_URL);
      if (process.env.NODE_ENV === 'production') {
        app.listen(config.port, () => {
          console.log(`Server running on port ${config.port}`);
        });
      } else {
        const keyDir = path.join(__dirname, '../localhost+2-key.pem');
        const certDir = path.join(__dirname, '../localhost+2.pem');
        const key = fs.readFileSync(keyDir, 'utf8');
        const cert = fs.readFileSync(certDir, 'utf8');
        https.createServer({ key, cert }, app).listen(config.httpsPort, () => {
          console.log(`HTTPS Server running on port ${config.httpsPort}`);
        });
      }
    } catch (error) {
      console.error('Error initializing tables:', error);
    }
  }

  startServer();
}

async function main() {
  const configPath = path.join(__dirname, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath).toString());
  const pool = new Pool(config.database);
  /** Set postgres session timezone to UTC. */
  pool.on('connect', (client) => {
    client.query('SET TIME ZONE \'UTC\';', (err) => {
      if (err) {
        console.error('Error executing SET TIME ZONE command', err);
      }
    });
  });
  runExpress(pool, config);
}

main();
