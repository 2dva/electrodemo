import { IEngineWrapper } from '../main/constants';

const sqlite3 = require('sqlite3');

export class Sqlite3Wrapper implements IEngineWrapper {
  database: any;

  constructor() {
    console.log('Sqlite3Wrapper:constructor');
  }

  open(filename: string) {
    this.database = new sqlite3.Database(filename, (err: never) => {
      if (err) {
        console.error('Sqlite3:Database opening error: ', err);
      } else {
        console.log('Sqlite3:Database open success.');
      }
    });
  }

  all(query: string, cb: (err: never, rows: never) => void) {
    return this.database.all(query, (err: never, rows: never) => {
      console.log(`Sqlite3:Database query success`, rows);
      cb(err, rows);
    });
  }
}
