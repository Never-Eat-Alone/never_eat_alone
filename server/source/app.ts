import * as Bodyparser from 'body-parser';
import * as Cors from 'cors';
import * as Express from 'express';
import * as Session from 'express-session';
import * as fs from 'fs';
import Helmet from 'helmet';
import * as Path from 'path';
import { Pool } from 'pg';
import * as SGMail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import { AttendeeDatabase } from './postgres/queries/attendee_database';
import { DiningEventDatabase } from './postgres/queries/dining_event_database';
import { SocialMediaImageDatabase
} from './postgres/queries/social_media_image_database';
import { UserDatabase } from './postgres/queries/user_database';
import { UserProfileImageDatabase
} from './postgres/queries/user_profile_image_database';
import { AttendeeRoutes } from './routes/attendee';
import { DiningEventRoutes } from './routes/dining_event';
import { SocialMediaImageRoutes } from './routes/social_media_image';
import { UserRoutes } from './routes/user';
import { UserProfileImageRoutes } from './routes/user_profile_image';

const pgSession = require('connect-pg-simple')(Session);
const initializePostgres = async (pool, dir, label) => {
  const fileNames = fs.readdirSync(dir).filter(
    f => Path.extname(f).toLowerCase() === '.sql');
  for (const fileName of fileNames) {
    const value = fileName.replace('.sql', '');
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
          reject(error);
          return;
        }
        if (results.rows.length == 0 || results.rows[0][column] == null) {
          const query = fs.readFileSync(dir + `${fileName}`).toString();
          pool.query(query, (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            console.log(`${value} ${label} was successfully created.`);
            resolve();
          });
        } else {
          console.log(`${value} ${label} already exist.`);
          resolve();
        }
      });
    });
  }
}

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
      //secure: false,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
    }
  };
  app.set('trust proxy', 1);
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
  }
  app.use(Session(session));
  app.get('/api/google_client_id', (request, response) => {
    let id = '';
    try {
      id = config.google_client_id;
    } catch (error) {
      response.status(400).json({ google_client_id: id, message: 'ERROR' });
      return;
    }
    response.status(200).json({ google_client_id: id });
  });
  const userDatabase = new UserDatabase(pool);
  const userRoutes = new UserRoutes(app, userDatabase, SGMail);
  const userProfileImageDatabase = new UserProfileImageDatabase(pool);
  const userProfileImageRoutes = new UserProfileImageRoutes(app,
    userProfileImageDatabase);
  const socialMediaImageDatabase = new SocialMediaImageDatabase(pool);
  const socialMediaImageRoutes = new SocialMediaImageRoutes(app,
    socialMediaImageDatabase);
  const diningEventDatabase = new DiningEventDatabase(pool);
  const diningEventRoutes = new DiningEventRoutes(app, diningEventDatabase);
  const attendeeDatabase = new AttendeeDatabase(pool);
  const attendeeRoutes = new AttendeeRoutes(app, attendeeDatabase);
  app.get('*', (request, response, next) => {
    response.sendFile(Path.join(process.cwd(), 'public', 'index.html'));
  });
  app.listen(config.port, async () => {
    await initializePostgres(pool, '../source/postgres/types/', 'type');
    await initializePostgres(pool, '../source/postgres/tables/', 'table');  
  });
}

async function main() {
  const config = JSON.parse(fs.readFileSync('config.json').toString());
  SGMail.setApiKey(config.send_grid_api_key);
  const pool = new Pool(config.database);
  runExpress(pool, config);
}

main();
