import { makeAutoObservable } from 'mobx';
import { IFileInfo } from '../../main/constants';

interface DBInfo {
  connected: boolean;
  fileName: string;
  fileSize: number;
  systemInfo: string | null;
  shouldCreate: boolean;
}

interface ISettings {
  dark: boolean;
}

export class DBStore {
  info: DBInfo = {
    connected: false,
    fileName: '',
    fileSize: 0,
    systemInfo: null,
    shouldCreate: false,
  };

  settings: ISettings = {
    dark: false,
  };

  constructor() {
    makeAutoObservable(this);
    if (localStorage.getItem('settingDark') === '1') {
      this.settings.dark = true;
    }
  }

  openDB = (fileName: string, shouldCreate = false) => {
    this.info.fileName = fileName;
    this.info.shouldCreate = shouldCreate;
  };

  setFileInfo = (info: IFileInfo) => {
    this.info.connected = info.connected;
    this.info.fileName = info.fileName || '';
    this.info.fileSize = info.fileSize || 0;
  };

  setInfo = (info: string) => {
    this.info.systemInfo = info;
  };

  switchTheme = () => {
    this.settings.dark = !this.settings.dark;
    localStorage.setItem('settingDark', `${+this.settings.dark}`);
    console.log('switchTHeme=', this.settings.dark);
  };
}

export const dbStore = new DBStore();
