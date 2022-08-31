import { BrowserWindow, ipcMain } from 'electron';
import { Channels, EVENT_COMMAND_SEND } from './constants';
import { dbFetchRecRows } from '../db/manager';

type IApiFunction = (params: unknown) => unknown;
type IAPI = Record<string, IApiFunction>;

const Api: IAPI = {
  fetchRecRows: () => {
    return dbFetchRecRows();
  },
};

let mainWindow: BrowserWindow;
export const initApi = (win: BrowserWindow) => {
  mainWindow = win;

  ipcMain.handle(Channels.IPC_FUNCTION_CHANNEL, async (_event, [functionName, params]) => {
    console.log('Api:functionName:', functionName);
    const apiFunction: IApiFunction = Api[functionName];
    return (apiFunction && apiFunction(params)) || Promise.reject();
  });

  ipcMain.addListener(EVENT_COMMAND_SEND, (command: string, data: object | null = null) => {
    console.log('Api:EVENT_COMMAND_SEND:', command);
    mainWindow.webContents.send(Channels.IPC_COMMAND_CHANNEL, command, data);
  });
};
