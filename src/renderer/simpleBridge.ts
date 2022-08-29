import { Channels } from '../main/constants';
import { IExposedRenderer } from './preload';

let ipcRenderer: IExposedRenderer;

export const setRenderer = (ipcRendererInctance: IExposedRenderer) => {
  ipcRenderer = ipcRendererInctance;
};

export const executeRemoteFunction = (
  functionName: string,
  data: Record<string, unknown>
): Promise<unknown> => {
  console.log(
    `Bridge:executeRemoteFunction:invoke functionName=${functionName}`
  );
  return ipcRenderer
    .invoke(Channels.IPC_FUNCTION_CHANNEL, [functionName, data])
    .then((result) => {
      console.log('Bridge: IPC_EVENT_CHANNEL: result=', result);
      return result;
    });
};
