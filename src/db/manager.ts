import path from 'path';
import { execQuery, getQuery, openFileDatabase } from './engine';

const fName = '../test.db';
const filename = path.resolve(__dirname, fName);

const SQL_SELECT_REC_ROWS =
  'SELECT rec_id, date, cat_id, created, title FROM rec';
const SQL_INSERT_REC_ROW =
  'INSERT INTO rec (date, cat_id, title, text, created, tags) VALUES (date(), ?, ?, ?, datetime(), ?)';

const insertRandomValues = (num: number) => {
  // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < num; i++) {
    execQuery(SQL_INSERT_REC_ROW, [1, `title ${i}`, `text ${i}`, 'news']).catch(
      () => {}
    );
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
