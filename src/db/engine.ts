import { existsSync, statSync } from 'fs-extra';
import { ipcMain } from 'electron';
import { IEngineWrapper, IStatement, Sqlite3Wrapper } from './Sqlite3Wrapper';
import { EVENT_COMMAND_SEND } from '../main/constants';
import { Commands } from '../commonConstants';

let engine: IEngineWrapper | undefined;

export enum Engines {
  // https://www.npmjs.com/package/knex
  DB_ENGINE_KNEX = 'knex',
  // https://www.npmjs.com/package/sqlite3
  DB_ENGINE_SQLITE3 = 'sqlite3',
  // https://www.npmjs.com/package/better-sqlite3-with-prebuilds
  DB_ENGINE_BETTER_SQLITE3 = 'better-sqlite3',
}

const getEngineClass = (engineType: Engines = Engines.DB_ENGINE_SQLITE3) => {
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
  return Sqlite3Wrapper;
};

export const closeFileDatabase = () => {
  engine = undefined;

  // Send info to client
  ipcMain.emit(EVENT_COMMAND_SEND, Commands.COMMAND_DB_INFO, { connected: false });
  return true;
};

export const openFileDatabase = (fileName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!existsSync(fileName)) {
      return reject(new Error(`Couldnt open file ${fileName}`));
    }

    engine = new (getEngineClass())(fileName);
    if (!engine) {
      return reject(new Error('Cant create DB Engine'));
    }

    const stats = statSync(fileName);
    // Send info to client
    ipcMain.emit(EVENT_COMMAND_SEND, Commands.COMMAND_DB_INFO, { connected: true, fileName, fileSize: stats.size });

    return resolve(true);
  });
};

export const getQuery = (query: string): Promise<Array<unknown>> => {
  return new Promise((resolve, reject) => {
    engine?.all(query, (err: unknown, rows: unknown[]) => {
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

export const prepareQuery = (query: string): Promise<IStatement | undefined> => {
  return new Promise((resolve) => {
    const stmt = engine?.prepare(query);
    resolve(stmt);
  });
};

export const execQuery = (query: string, params: Array<unknown>): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const stmt = engine?.prepare(query);
    console.log('DB:Engine:before executing:params=', params);
    stmt?.run(params, (err: unknown) => {
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
