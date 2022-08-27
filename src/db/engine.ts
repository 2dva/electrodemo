import { existsSync } from 'fs-extra';
import { Sqlite3Wrapper } from './Sqlite3Wrapper';
import { IEngineWrapper } from '../main/constants';

let engine: IEngineWrapper;

export enum Engines {
  // https://www.npmjs.com/package/knex
  DB_ENGINE_KNEX = 'knex',
  // https://www.npmjs.com/package/sqlite3
  DB_ENGINE_SQLITE3 = 'sqlite3',
  // https://www.npmjs.com/package/better-sqlite3-with-prebuilds
  DB_ENGINE_BETTER_SQLITE3 = 'better-sqlite3',
}

const getEngine = (engineType: Engines = Engines.DB_ENGINE_SQLITE3) => {
  switch (engineType) {
    case Engines.DB_ENGINE_KNEX:
      // not implemented
      break;
    case Engines.DB_ENGINE_BETTER_SQLITE3:
      // not implemented
      break;
    case Engines.DB_ENGINE_SQLITE3:
    default:
  }
  return new Sqlite3Wrapper();
};

export const openFileDatabase = (fileName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    engine = getEngine();
    if (!engine) {
      return reject(new Error('Cant create DB Engine'));
    }
    if (!existsSync(fileName)) {
      return reject(new Error(`Couldnt open file ${fileName}`));
    }

    engine.open(fileName);
    return resolve(true);
  });
};

export const getQuery = (query: string): Promise<Array<unknown>> => {
  return new Promise((resolve, reject) => {
    engine.all(query, (err: unknown, rows: unknown[]) => {
      if (err) {
        console.log(`getQuery: query error`, err);
        reject(err);
      } else {
        console.log(`getQuery: query success`);
        resolve(rows);
      }
    });
  });
};

export const execQuery = (
  query: string,
  params: Array<unknown>
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const stmt = engine.prepare(query);
    stmt.run(params, (err: unknown) => {
      if (err) {
        console.log(`execQuery: query error ${err}`);
        reject(err);
      } else {
        console.log(`execQuery: query success`);
        resolve(true);
      }
    });
  });
};
