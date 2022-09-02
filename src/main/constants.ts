export enum Channels {
  IPC_COMMAND_CHANNEL = 'ipc-command',
  IPC_EVENT_CHANNEL = 'ipc-event',
  IPC_FUNCTION_CHANNEL = 'ipc-function',
  IPC_EXAMPLE_CHANNEL = 'ipc-example',
}

export enum Commands {
  COMMAND_DB_OPEN = 'COMMAND_DB_OPEN',
  COMMAND_DB_TOOLS = 'COMMAND_DB_TOOLS',
  COMMAND_DB_INFO = 'COMMAND_DB_INFO',
  COMMAND_INFO = 'COMMAND_INFO',
}

export const EVENT_COMMAND_SEND = 'sendToRenderer';

export interface IStatement {
  run(params: Array<unknown>, cb?: (err: unknown) => void): void;
}

export interface IEngineWrapper {
  all(query: string, cb: (err: unknown, rows: unknown[]) => void): void;
  prepare(query: string): IStatement;
}

export interface IFileInfo {
  connected: boolean;
  fileName: string | null;
  fileSize: number;
}
