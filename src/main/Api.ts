import { ipcMain } from 'electron';
import { closeDB, dbFetchRecRows, dbInsertRecRow, dbInsertRecTestRows, openDBFile } from '../db/manager';
import { Channels, IRecItem } from '../commonConstants';

type IApiFunction = (params: Record<string, unknown>) => unknown;
type IAPI = Record<string, IApiFunction>;

const Api: IAPI = {
  openDB: ({ filePath }) => {
    return openDBFile(filePath as string);
  },

  closeDB: () => {
    return closeDB();
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
