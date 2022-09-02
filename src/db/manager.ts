import path from 'path';
import { execQuery, getQuery, openFileDatabase, prepareQuery } from './engine';

const fName = '../test.db';
const filename = path.resolve(__dirname, fName);

const SQL_SELECT_REC_ROWS = 'SELECT rec_id, date, cat_id, created, title FROM rec';
const SQL_INSERT_REC_ROW =
  'INSERT INTO rec (date, cat_id, title, text, created, tags) VALUES (date(), ?, ?, ?, datetime(), ?)';

const insertRandomValues = (num: number) => {
  // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < num; i++) {
    execQuery(SQL_INSERT_REC_ROW, [1, `title ${i}`, `text ${i}`, 'news']).catch(() => {});
    // stmt.run("Ipsum " + i);
  }
};

export const dbFetchRecRows = () => {
  return getQuery(SQL_SELECT_REC_ROWS)
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      console.log(`Async Database query error`, err);
    });
};

export const dbInsertRecTestRows = (n: number) => {
  const getRandomSymbol = (): string => {
    return String.fromCharCode(((Math.random() * 100) % 90) + 33);
  };

  const getRandomCategory = (): number => {
    return ((Math.random() * 10) % 4) + 1;
  };
  console.log('Api.insertRecTestRows', n);
  return new Promise((resolve, reject) => {
    const prefix = getRandomSymbol() + getRandomSymbol();
    prepareQuery(SQL_INSERT_REC_ROW)
      .then((stmt) => {
        for (let i = 0; i < n; i++) {
          stmt.run([getRandomCategory(), `auto[${prefix}] title ${i}`, `[${prefix}] test text ${i}`, 'news']);
        }
        return resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
};

export const openDB = () => {
  return openFileDatabase(filename).catch((err) => {
    console.log(`Async Database open error`, err);
  });
};

export const checkDBExamples = () => {
  openFileDatabase(filename).catch((err) => {
    console.log(`Async Database open error`, err);
  });
  insertRandomValues(10);
};
