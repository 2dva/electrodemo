import { ipcMain } from 'electron';
import {
  closeDB,
  dbExecQuery,
  dbFetchRecRow,
  dbFetchRecRows,
  dbInsertRecRow,
  dbInsertRecTestRows,
  dbUpdateRecRow,
  openDBFile,
} from '../db/manager';
import { Channels, IRecItem } from '../commonConstants';

type IApiFunction = (params: Record<string, unknown>) => unknown;
type IAPI = Record<string, IApiFunction>;

const Api: IAPI = {
  openDB: ({ filePath }) => {
    return openDBFile(filePath as string);
  },

  execDB: ({ query }) => {
    return dbExecQuery(query as string);
  },

  closeDB: () => {
    return closeDB();
  },

  fetchRecRow: ({ recId }) => {
    return dbFetchRecRow(recId as number);
  },

  fetchRecRows: () => {
    return dbFetchRecRows();
  },

  insertRecRow: ({ catId, created, title, text, tags, date }) => {
    const data = {
      catId,
      created,
      title,
      text,
      tags,
      date,
    };
    return dbInsertRecRow(data as IRecItem);
  },

  updateRecRow: ({ recId, catId, title, text, tags, date }) => {
    const data = {
      recId,
      catId,
      title,
      text,
      tags,
      date,
    };
    return dbUpdateRecRow(data as IRecItem);
  },

  insertRecTestRows: ({ n }) => {
    return dbInsertRecTestRows(n as number);
  },
};

export const initApi = () => {
  ipcMain.handle(Channels.IPC_FUNCTION_CHANNEL, async (_event, [functionName, params]) => {
    console.log('Api:functionName:', functionName);
    const apiFunction: IApiFunction = Api[functionName];
    return (apiFunction && apiFunction(params)) || Promise.reject();
  });
};
