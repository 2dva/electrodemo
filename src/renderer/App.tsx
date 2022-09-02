import { AdaptivityProvider, AppRoot, ConfigProvider, SizeType } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { observer } from 'mobx-react';
import { MainLayout } from './components/MainLayout';
import { appStore } from './stores/appStore';

const App = observer(() => {
  return (
    <ConfigProvider appearance={appStore.settings.dark ? 'dark' : 'light'}>
      <AdaptivityProvider sizeX={SizeType.REGULAR} sizeY={SizeType.REGULAR}>
        <AppRoot>
          <MainLayout />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
});

export default App;
