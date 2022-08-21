import { createRoot } from 'react-dom/client';
// import App from './App';
import { VKDemo } from './VKDemo';
import { modalStore } from './modalStore';
import { Channels, COMMAND_DB_OPEN } from '../main/constants';

const MODAL_PAGE_FILTERS = 'filters';
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<VKDemo />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(Channels.IPC_EXAMPLE_CHANNEL, (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.on(Channels.IPC_COMMAND_CHANNEL, (arg) => {
  // eslint-disable-next-line no-console
  console.log('COMMAND', arg);
  switch (arg) {
    case COMMAND_DB_OPEN:
      modalStore.openModal(MODAL_PAGE_FILTERS);
      break;
    default:
  }
});
window.electron.ipcRenderer.sendMessage(Channels.IPC_EXAMPLE_CHANNEL, ['ping']);
