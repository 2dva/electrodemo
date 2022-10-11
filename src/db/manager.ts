import path from 'path';
import {
  closeFileDatabase,
  encryptDB,
  execQuery,
  getQuery,
  getQueryAll,
  openFileDatabase,
  prepareQuery,
} from './engine';
import { formatSQLDate, IRecItem } from '../commonConstants';
import {
  SQL_DELETE_REC_ROW,
  SQL_INSERT_REC_ROW,
  SQL_SELECT_REC_HEALTH,
  SQL_SELECT_REC_ROW,
  SQL_SELECT_REC_ROWS,
  SQL_UPDATE_REC_ROW,
} from './sqlConstants';

export const encryptDemoDB = () => {
  const testEncryptKey = 'qwe';
  encryptDB(testEncryptKey).catch(() => {});
};

export const dbCheckHealth = () => {
  return getQuery(SQL_SELECT_REC_HEALTH)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(`Async Database health not ok`, err);
    });
};

export const dbFetchRecRows = (limit = -1) => {
  return getQueryAll(SQL_SELECT_REC_ROWS, [limit])
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      console.log(`Async Database query all error`, err);
    });
};

export const dbFetchRecRow = (recId: number) => {
  return getQuery(SQL_SELECT_REC_ROW, [recId])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Async Database query error`, err);
    });
};

export const dbInsertRecRow = (data: IRecItem) => {
  const params = [data.catId, data.title, data.text, data.tags, formatSQLDate(data.date)];
  return execQuery(SQL_INSERT_REC_ROW, params)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Async Database insert query error`, err);
    });
};

export const dbUpdateRecRow = (data: IRecItem) => {
  const params = [data.catId, data.title, data.text, data.tags, formatSQLDate(data.date), data.recId];
  return execQuery(SQL_UPDATE_REC_ROW, params)
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
    return Math.floor((Math.random() * 100) % 4);
  };
  console.log('Api.insertRecTestRows', n);
  return new Promise((resolve, reject) => {
    const prefix = getRandomSymbol() + getRandomSymbol();
    prepareQuery(SQL_INSERT_REC_ROW)
      .then((stmt) => {
        for (let i = 0; i < n; i++) {
          stmt?.run([
            getRandomCategory(),
            `auto[${prefix}] title ${i}`,
            `[${prefix}] test text ${i}`,
            'news',
            '2022-09-01',
          ]);
        }
        return resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
};

export const dbDeleteRec = (recId: number) => {
  const params = [recId];
  return execQuery(SQL_DELETE_REC_ROW, params)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Async Database delete query error`, err);
    });
};

export const dbExecQuery = (query: string) => {
  console.log(`DB:Manager:dbExecQuery query=${query}`);
  return getQueryAll(query, [])
    .then((result) => {
      console.log('res:', result);
      return result;
    })
    .catch((err) => {
      console.log(`Async Database query tool error`, err);
    });
};

export const closeDB = () => {
  return closeFileDatabase();
};

export const openDBTest = () => {
  const dbTestFile = '../test.db';
  const dbTestFilePath = path.resolve(__dirname, dbTestFile);

  openFileDatabase(dbTestFilePath).catch((err) => {
    console.log(`Test database open err`, err);
  });
};

export const openDBFile = (filePath: string) => {
  return openFileDatabase(filePath)
    .then(() => {
      // encryptDemoDB();
      return true;
    })
    .catch(() => {
      console.log(`Database error opening file "${filePath}"`);
    });
};
