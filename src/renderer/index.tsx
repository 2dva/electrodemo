import { createRoot } from 'react-dom/client';
import { autorun } from 'mobx';
import App from './App';
import { modalStore } from './stores/modalStore';
import { Channels, Commands, IFileInfo } from '../main/constants';
import { MODAL_PAGE_OPEN_DB } from './constants';
import { appStore } from './stores/appStore';
import { setRenderer } from './simpleBridge';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

const ipcr = window.electron.ipcRenderer;
setRenderer(ipcr);

// calling IPC exposed from preload script
ipcr.once(Channels.IPC_EXAMPLE_CHANNEL, (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
ipcr.on(Channels.IPC_COMMAND_CHANNEL, (...args) => {
  const [command, data] = args;
  console.log('COMMAND:', command, data);
  switch (command) {
    case Commands.COMMAND_DB_OPEN:
      modalStore.openModal(MODAL_PAGE_OPEN_DB);
      break;
    case Commands.COMMAND_DB_INFO:
      appStore.setFileInfo(data as IFileInfo);
      break;
    default:
  }
});
ipcr
  .invoke(Channels.IPC_EXAMPLE_CHANNEL, ['ping'])
  .then((args) => {
    console.log('EXMAPLE invoke() returnned:', args);
    return true;
  })
  .catch(() => {});
// ipcr.sendMessage(Channels.IPC_EXAMPLE_CHANNEL, ['ping']);
ipcr.sendMessage(Channels.IPC_EVENT_CHANNEL, ['ready']);

autorun(() => {
  console.log('index:dbStore.file=', appStore.dbinfo.fileName);
});
