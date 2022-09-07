import path from 'path';
import { closeFileDatabase, execQuery, getQuery, openFileDatabase, prepareQuery } from './engine';
import { IRecItem } from '../commonConstants';

const dbTestFile = '../test.db';
const dbTestFilePath = path.resolve(__dirname, dbTestFile);

const SQL_SELECT_REC_ROWS = 'SELECT rec_id, date, cat_id, created, title FROM rec ORDER BY rec_id DESC';
const SQL_INSERT_REC_ROW =
  'INSERT INTO rec (date, cat_id, title, text, created, tags) VALUES (date(), ?, ?, ?, datetime(), ?)';

export const dbFetchRecRows = () => {
  return getQuery(SQL_SELECT_REC_ROWS)
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      console.log(`Async Database query error`, err);
    });
};

export const dbInsertRecRow = (data: IRecItem) => {
  const params = [data.catId, data.title, data.text, data.tags];
  return execQuery(SQL_INSERT_REC_ROW, params)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Async Database insert query error`, err);
    });
};

export const dbInsertRecTestRows = (n: number) => {
  const getRandomSymbol = (): string => {
    return String.fromCharCode(((Math.random() * 100) % 90) + 33);
  };

  const getRandomCategory = (): number => {
    return Math.floor((Math.random() * 100) % 4) + 1;
  };
  console.log('Api.insertRecTestRows', n);
  return new Promise((resolve, reject) => {
    const prefix = getRandomSymbol() + getRandomSymbol();
    prepareQuery(SQL_INSERT_REC_ROW)
      .then((stmt) => {
        for (let i = 0; i < n; i++) {
          stmt?.run([getRandomCategory(), `auto[${prefix}] title ${i}`, `[${prefix}] test text ${i}`, 'news']);
        }
        return resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
};

export const closeDB = () => {
  return closeFileDatabase();
};

export const openDBTest = () => {
  openFileDatabase(dbTestFilePath).catch((err) => {
    console.log(`Test database open err`, err);
  });
};

export const openDBFile = (filePath: string) => {
  return openFileDatabase(filePath).catch(() => {
    console.log(`Database error opening file "${filePath}"`);
  });
};
