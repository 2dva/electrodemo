export enum Channels {
  IPC_COMMAND_CHANNEL = 'ipc-command',
  IPC_EVENT_CHANNEL = 'ipc-event',
  IPC_EXAMPLE_CHANNEL = 'ipc-example',
}

export interface IEngineWrapper {
  open(fileName: string): void;
  all(query: string, cb: () => void): void;
}

export const COMMAND_DB_OPEN = 'COMMAND_DB_OPEN';
export const COMMAND_INFO = 'COMMAND_INFO';
export const COMMAND_DB_TOOLS = 'COMMAND_DB_TOOLS';
