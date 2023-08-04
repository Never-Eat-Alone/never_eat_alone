import * as Bodyparser from 'body-parser';
import * as Cors from 'cors';
import * as CookieParser from 'cookie-parser';
import * as Express from 'express';
import * as Session from 'express-session';
import * as fs from 'fs';
import Helmet from 'helmet';
import * as path from 'path';
import { Pool } from 'pg';
import * as SGMail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import { AttendeeDatabase } from './postgres/queries/attendee_database';
import { UserCoverImageDatabase } from
'./postgres/queries/user_cover_image_database';
import { DeactivateAccountSurveyDatabase
} from './postgres/queries/deactivate_account_survey_database';
import { DeleteAccountSurveyDatabase
} from './postgres/queries/delete_account_survey_database';
import { DiningEventDatabase } from './postgres/queries/dining_event_database';
import { LocationDatabase } from './postgres/queries/location_database';
import { SocialMediaImageDatabase
} from './postgres/queries/social_media_image_database';
import { UserDatabase } from './postgres/queries/user_database';
import { UserProfileImageDatabase
} from './postgres/queries/user_profile_image_database';
import { DeactivateAccountSurveyRoutes
} from './routes/deactivate_account_survey';
import { DeleteAccountSurveyRoutes } from './routes/delete_account_survey';
import { DiningEventRoutes } from './routes/dining_event';
import { SocialMediaImageRoutes } from './routes/social_media_image';
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

function runExpress(pool: Pool, config: any) {
  const app = Express();
  app.use(Helmet({
      contentSecurityPolicy: false,
  }));
  app.use(Bodyparser.json());
  app.use(Cors(
    {
      credentials: true,
      origin: [process.env.FRONTEND_APP_URL]
    }
  ));
  app.use(Express.static('public'));
  app.use(
    Bodyparser.urlencoded({
      extended: true
    })
  );
  const session = {
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
      secure: false
    }
  };

  app.set('trust proxy', 1);
  if (app.get('env') === 'production') {
    session.cookie.secure = true;
  }
  app.use(CookieParser());
  app.use(Session(session));
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
  const userDatabase = new UserDatabase(pool);
  const userProfileImageDatabase = new UserProfileImageDatabase(pool);
  const userProfileImageRoutes = new UserProfileImageRoutes(app,
    userProfileImageDatabase);
  const userCoverImageDatabase = new UserCoverImageDatabase(pool);
  const attendeeDatabase = new AttendeeDatabase(pool);
  const userRoutes = new UserRoutes(app, userDatabase, attendeeDatabase,
    userProfileImageDatabase, userCoverImageDatabase, SGMail);
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
  app.get('*', (request, response, next) => {
    response.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  });

  /** Start the server after initializing the tables */
  const startServer = async () => {
    try {
      await initializePostgres(pool, '../source/postgres/types/', 'type');
      await initializePostgres(pool, '../source/postgres/tables/', 'table', [
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
        'user_favourite_cuisines'
      ]);
      app.listen(config.port, async () => {});
    } catch (error) {
      console.error('Error initializing tables:', error);
    }
  }

  startServer();
}

async function main() {
  const configPath = path.join(__dirname, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath).toString());
  SGMail.setApiKey(config.send_grid_api_key);
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
