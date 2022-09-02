import { ipcMain } from 'electron';
import { dbFetchRecRows, dbInsertRecTestRows } from '../db/manager';
import { Channels } from '../commonConstants';

type IApiFunction = (params: Record<string, unknown>) => unknown;
type IAPI = Record<string, IApiFunction>;

const Api: IAPI = {
  fetchRecRows: () => {
    return dbFetchRecRows();
  },

  insertRecTestRows: ({ n }) => {
    return dbInsertRecTestRows(Number(n));
  },
};

export const initApi = () => {
  ipcMain.handle(Channels.IPC_FUNCTION_CHANNEL, async (_event, [functionName, params]) => {
    console.log('Api:functionName:', functionName);
    const apiFunction: IApiFunction = Api[functionName];
    return (apiFunction && apiFunction(params)) || Promise.reject();
  });
};
