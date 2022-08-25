import { Sqlite3Wrapper } from './Sqlite3Wrapper';

export enum Engines {
  // https://www.npmjs.com/package/knex
  DB_ENGINE_KNEX = 'knex',
  // https://www.npmjs.com/package/sqlite3
  DB_ENGINE_SQLITE3 = 'sqlite3',
  // https://www.npmjs.com/package/better-sqlite3-with-prebuilds
  DB_ENGINE_BETTER_SQLITE3 = 'better-sqlite3',
}

export const getEngine = (engineType: Engines = Engines.DB_ENGINE_SQLITE3) => {
  switch (engineType) {
    case Engines.DB_ENGINE_KNEX:
      // not implemented
      break;
    case Engines.DB_ENGINE_BETTER_SQLITE3:
      // not implemented
      break;
    case Engines.DB_ENGINE_SQLITE3:
      return new Sqlite3Wrapper();
    default:
  }
  return null;
};

/*
 * Commented examples
 * */
// import knex, { Knex } from 'knex';
// import {existsSync} from "fs-extra";
// const checkKnex = () => {
//   connection = knex({
//     client: 'sqlite3',
//     connection: {
//       filename,
//     },
//   });
//
//   const result = connection.select('title').from('recs');
//   result
//     .then((rows) => {
//       console.log(`Knex:DB EXAMPLE:`, rows);
//       return true;
//     })
//     .catch((err) => {
//       console.log('Knex:DB EXAMPLE EXCEPTION:', err);
//     });
// };
//
// const db = require('better-sqlite3-with-prebuilds')(filename, {});
// const checkBetterSqlite3 = () => {
//   console.log('Check Better-Sqlite3------');
//   const db: Database = new Sqlite(filename, {});
//   const stmt = db.prepare('SELECT * FROM recs');
//   const row = stmt.all();
//   console.log('Better-Sqlite3:Database opened successfully', row);
// };
//
// const checkSqlite3 = () => {
//   database = new sqlite3.Database(filename, (err: never) => {
//     if (err) {
//       console.error('Sqlite3:Database opening error: ', err);
//     } else {
//       console.log('Sqlite3:Database open success.');
//     }
//   });
//
//   database.all('SELECT * FROM recs', (_err: never, rows: never) => {
//     console.log(`Sqlite3:Database query success`, rows);
//   });
// };
//
// const sqliteAsync = require('sqlite-async').verbose();
// // const sqliteAsync = require('sqlite-async');
// const checkSqliteAsync = () => {
//   console.log('Check Sqlite-Async------');
//   databaseAsync = sqliteAsync.Database.open(filename)
//     .then((db: any) => {
//       db.all('SELECT * FROM recs', (_err: never, rows: never) => {
//         console.log(`Async Database query success`, rows);
//       });
//     })
//     .catch((err: never) => {
//       console.error('Async Database opening error: ', err);
//     });
//   // Database.open(filename)
//   //   .then((db: any) => {
//   //     console.log('Database opened successfully 123');
//   //     dbConnection = db;
//   //   })
//   //   .catch((err: any) => {
//   //     console.error('Database opening error: ', err);
//   //   });
// };
//
// export const checkDBExamples = () => {
//   if (!existsSync(filename)) {
//     console.log('DB FILE NOT FOUND', filename);
//     return;
//   }
//   console.log('DB file found', filename);
//
//   // checkKnex();
//   // checkSqlite3();
//   // checkSqliteAsync();
//   // checkBetterSqlite3();
// };
