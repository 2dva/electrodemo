import { Database } from 'sqlite3';

export enum Channels {
  IPC_COMMAND_CHANNEL = 'ipc-command',
  IPC_EVENT_CHANNEL = 'ipc-event',
  IPC_FUNCTION_CHANNEL = 'ipc-function',
  IPC_EXAMPLE_CHANNEL = 'ipc-example',
}

export interface IStatement {
  run(params: Array<unknown>, cb: (err: unknown) => void): void;
}

export interface IEngineWrapper {
  all(query: string, cb: (err: unknown, rows: unknown[]) => void): void;
  prepare(query: string): IStatement;
}

export const COMMAND_DB_OPEN = 'COMMAND_DB_OPEN';
export const COMMAND_INFO = 'COMMAND_INFO';
export const COMMAND_DB_TOOLS = 'COMMAND_DB_TOOLS';
