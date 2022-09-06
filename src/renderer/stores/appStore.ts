import { makeAutoObservable } from 'mobx';
import { IFileInfo } from '../../commonConstants';
import { executeRemoteFunction } from '../simpleBridge';

interface DBInfo {
  connected: boolean;
  fileName: string;
  fileSize: number;
}

interface ISettings {
  dark: boolean;
  restoreOnStartup: boolean;
}

class AppStore {
  dbinfo: DBInfo = {
    connected: false,
    fileName: '',
    fileSize: 0,
  };

  settings: ISettings = {
    dark: false,
    restoreOnStartup: false,
  };

  constructor() {
    makeAutoObservable(this);
    this.settings.dark = localStorage.getItem('settingDark') === '1';
    this.settings.restoreOnStartup = localStorage.getItem('settingRestore') === '1';
  }

  openDB = (filePath: string) => {
    return executeRemoteFunction('openDB', { filePath }).then((success) => {
      if (success) {
        this.dbinfo.fileName = filePath;
        localStorage.setItem('settingLastFilename', filePath);
      }
      return success;
    });
  };

  closeDB = () => {
    localStorage.removeItem('settingLastFilename');
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

  switchSettingRestore = () => {
    this.settings.restoreOnStartup = !this.settings.restoreOnStartup;
    localStorage.setItem('settingRestore', `${+this.settings.restoreOnStartup}`);
  };
}

export const appStore = new AppStore();
