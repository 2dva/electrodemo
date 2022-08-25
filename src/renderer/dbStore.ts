import { makeAutoObservable } from 'mobx';

interface DBInfo {
  fileName: string | null;
  systemInfo: string | null;
  shouldCreate: boolean;
}

export class DBStore {
  info: DBInfo = {
    fileName: null,
    systemInfo: null,
    shouldCreate: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openDB = (fileName: string, shouldCreate = false) => {
    this.info.fileName = fileName;
    this.info.shouldCreate = shouldCreate;
  };

  setInfo = (info: string) => {
    this.info.systemInfo = info;
  };
}

export const dbStore = new DBStore();
