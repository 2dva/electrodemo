import { ipcMain } from 'electron';
import { Channels } from './constants';
import { dbFetchRecRows } from '../db/manager';

type IApiFunction = (params: unknown) => unknown;
type IAPI = Record<string, IApiFunction>;

const Api: IAPI = {
  fetchRecRows: () => {
    return dbFetchRecRows();
  },
};

export const initApi = () => {
  ipcMain.handle(Channels.IPC_FUNCTION_CHANNEL, async (_event, [functionName, params]) => {
    console.log('Api:functionName:', functionName);
    const apiFunction: IApiFunction = Api[functionName];
    return (apiFunction && apiFunction(params)) || Promise.reject();
  });
};
