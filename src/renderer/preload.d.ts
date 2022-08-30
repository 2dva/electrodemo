import { Channels } from '../main/constants';

export interface IExposedRenderer {
  sendMessage(channel: Channels, args: unknown[]): void;
  invoke(channel: Channels, args: unknown[]): Promise<unknown>;
  on(channel: string, func: (...args: unknown[]) => void): (() => void) | undefined;
  once(channel: string, func: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: IExposedRenderer;
    };
  }
}

export {};
