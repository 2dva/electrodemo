import path from 'path';
import { existsSync } from 'fs-extra';
import { getEngine } from './engine';
import { IEngineWrapper } from '../main/constants';

const fName = '../test.db';
const filename = path.resolve(__dirname, fName);
let engine: IEngineWrapper | null;

export const openFileDatabase = (fileName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    engine = getEngine();
    if (engine) {
      if (existsSync(fileName)) {
        engine.open(fileName);
        return resolve(true);
      } else {
        return reject(new Error(`Couldnt open file ${fileName}`));
      }
    }
    return reject(new Error('Cant create DB Engine'));
  });
};

export const getQuery = (query: string): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    engine?.all(query, (err: never, rows: Array<any>) => {
      if (err) {
        console.log(`getQuery: query error`, err);
        reject(err);
      } else {
        console.log(`getQuery: query success`, rows);
        resolve(rows);
      }
    });
  });
};

export const checkDBExamples = () => {
  openFileDatabase(filename).catch((err) => {
    console.log(`Async Database open error`, err);
  });

  getQuery('SELECT * FROM recs')
    .then((rows) => {
      console.log(`Async Database query success`, rows);
      return true;
    })
    .catch((err) => {
      console.log(`Async Database query error`, err);
    });
};
