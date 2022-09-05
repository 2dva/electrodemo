import { makeAutoObservable } from 'mobx';
import { IFileInfo } from '../../commonConstants';
import { executeRemoteFunction } from '../simpleBridge';

interface DBInfo {
  connected: boolean;
  fileName: string;
  fileSize: number;
  shouldCreate: boolean;
}

interface ISettings {
  dark: boolean;
}

class AppStore {
  dbinfo: DBInfo = {
    connected: false,
    fileName: '',
    fileSize: 0,
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

  openDB = (filePath: string, shouldCreate = false) => {
    this.dbinfo.fileName = filePath;
    this.dbinfo.shouldCreate = shouldCreate;
    return executeRemoteFunction('openDB', { filePath });
  };

  closeDB = () => {
    return executeRemoteFunction('closeDB');
  };

  setFileInfo = (info: IFileInfo) => {
    this.dbinfo.connected = info.connected;
    this.dbinfo.fileName = info.fileName || '';
    this.dbinfo.fileSize = info.fileSize || 0;
  };

  switchTheme = () => {
    this.settings.dark = !this.settings.dark;
    localStorage.setItem('settingDark', `${+this.settings.dark}`);
    console.log('switchTHeme=', this.settings.dark);
  };
}

export const appStore = new AppStore();
