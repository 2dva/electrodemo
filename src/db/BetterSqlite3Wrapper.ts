// @ts-ignore
import Database from 'better-sqlite3-multiple-ciphers';
import { IEngineWrapper, IStatement } from './sqlConstants';

const openDatabase = (filename: string) => {
  let db;
  try {
    db = new Database(filename, { fileMustExist: true });
    console.log('BSqlite3:Database open success.');
  } catch (ex) {
    console.error('BSqlite3:Database opening error: ', ex);
  }
  return db;
};

export class BetterSqlite3Wrapper implements IEngineWrapper {
  database: Database;

  constructor(filename: string) {
    this.database = openDatabase(filename);
    console.log('BSqlite3Wrapper:constructor');
  }

  get(query: string, params: Array<unknown>, cb: (err: unknown, row: unknown) => void) {
    return this.database.get(query, ...params, (err: unknown, row: unknown) => {
      console.log(`BSqlite3:Database query get success`);
      cb(err, row);
    });
  }

  all(query: string, params: Array<unknown>, cb: (err: unknown, rows: unknown[]) => void) {
    const stmt = this.database.prepare(query);
    console.log(`BSqlite3:Query prepared`);
    const rows = stmt.all(...params);
    console.log(`BSqlite3:Database query all success`);
    cb(null, rows);
  }

  prepare(query: string): IStatement {
    return this.database.prepare(query);
  }

  // @ts-ignore
  // eslint-disable-next-line class-methods-use-this
  encrypt(key: string) {
    // this.database.pragma(`key='${key}'`);
    // db.pragma("rekey='secret-key'");
    return null;
  }

  close(): void {
    this.database.close();
  }
}
