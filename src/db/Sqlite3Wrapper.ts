import sqlite, { Database } from 'sqlite3';
import { IEngineWrapper, IStatement } from './sqlConstants';

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

  get(query: string, params: Array<unknown>, cb: (err: unknown, row: unknown) => void) {
    return this.database.get(query, ...params, (err: unknown, row: unknown) => {
      console.log(`Sqlite3:Database query get success`);
      cb(err, row);
    });
  }

  all(query: string, params: Array<unknown>, cb: (err: unknown, rows: unknown[]) => void) {
    return this.database.all(query, ...params, (err: unknown, rows: unknown[]) => {
      console.log(`Sqlite3:Database query all success`);
      cb(err, rows);
    });
  }

  prepare(query: string): IStatement {
    return this.database.prepare(query);
  }

  close(): void {
    this.database.close();
  }
}
