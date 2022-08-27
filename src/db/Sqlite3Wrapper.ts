import { IEngineWrapper, IStatement } from '../main/constants';

const sqlite3 = require('sqlite3');

export class Sqlite3Wrapper implements IEngineWrapper {
  database: any;

  constructor() {
    console.log('Sqlite3Wrapper:constructor');
  }

  open(filename: string) {
    this.database = new sqlite3.Database(filename, (err: unknown) => {
      if (err) {
        console.error('Sqlite3:Database opening error: ', err);
      } else {
        console.log('Sqlite3:Database open success.');
      }
    });
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
