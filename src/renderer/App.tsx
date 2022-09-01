import { AdaptivityProvider, AppRoot, ConfigProvider, SizeType } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { observer } from 'mobx-react';
import { MainLayout } from './components/MainLayout';
import { dbStore } from './stores/dbStore';

const App = observer(() => {
  return (
    <ConfigProvider appearance={dbStore.settings.dark ? 'dark' : 'light'}>
      <AdaptivityProvider sizeX={SizeType.REGULAR} sizeY={SizeType.REGULAR}>
        <AppRoot>
          <MainLayout />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
});

export default App;
