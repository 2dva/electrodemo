import { createRoot } from 'react-dom/client';
import { autorun } from 'mobx';
import App from './App';
import { modalStore } from './stores/modalStore';
import { Channels, COMMAND_DB_OPEN, COMMAND_INFO } from '../main/constants';
import { MODAL_PAGE_OPEN_DB } from './constants';
import { dbStore } from './stores/dbStore';
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
    case COMMAND_DB_OPEN:
      modalStore.openModal(MODAL_PAGE_OPEN_DB);
      break;
    case COMMAND_INFO:
      if (data && typeof data === 'string') {
        dbStore.setInfo(data);
      } else if (data && typeof data === 'object') {
        dbStore.setInfo(JSON.stringify(data));
      }
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
  console.log('index:dbStore.file=', dbStore.info.fileName);
});
