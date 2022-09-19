export const DEMO_DBFILE_PATH = './demo.db';

export enum Channels {
  IPC_COMMAND_CHANNEL = 'ipc-command',
  IPC_EVENT_CHANNEL = 'ipc-event',
  IPC_FUNCTION_CHANNEL = 'ipc-function',
  IPC_EXAMPLE_CHANNEL = 'ipc-example',
}

export enum Commands {
  COMMAND_DB_OPEN = 'COMMAND_DB_OPEN',
  COMMAND_DB_CLOSE = 'COMMAND_DB_CLOSE',
  COMMAND_DB_TOOLS = 'COMMAND_DB_TOOLS',
  COMMAND_DB_QUERY = 'COMMAND_DB_QUERY',
  COMMAND_DB_INFO = 'COMMAND_DB_INFO',
}

export interface IFileInfo {
  connected: boolean;
  fileName: string | null;
  fileSize: number;
}

export interface IRecDB {
  rec_id?: number;
  cat_id: number;
  created?: number;
  title: string;
  text: string;
  tags: string;
  date: string;
}

export interface IRecItem {
  recId?: number;
  catId: number;
  created?: number;
  title: string;
  text: string;
  tags: string;
  date?: Date;
}

export const CategoryArray = ['journal', 'event', 'note', 'news'];

export const formatSQLDate = (date: Date = new Date()): string => {
  return date.toJSON().slice(0, 10);
};
