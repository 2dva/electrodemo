import sqlite, { Database } from 'sqlite3';
import { IEngineWrapper, IStatement } from '../main/constants';

const createDatabase = (filename: string) => {
  const sqlite3 = sqlite.verbose();
  return new sqlite3.Database(filename, (err: Error | null) => {
    if (err) {
      console.error('Sqlite3:Database opening error: ', err);
    } else {
      console.log('Sqlite3:Database open success.');
    }
  });
};

export class Sqlite3Wrapper implements IEngineWrapper {
  database: Database;

  constructor(filename: string) {
    this.database = createDatabase(filename);
    console.log('Sqlite3Wrapper:constructor');
  }

  all(query: string, cb: (err: unknown, rows: unknown[]) => void) {
    return this.database.all(query, (err: unknown, rows: unknown[]) => {
      console.log(`Sqlite3:Database query success`);
      cb(err, rows);
    });
  }

  prepare(query: string): IStatement {
    return this.database.prepare(query);
  }
}
