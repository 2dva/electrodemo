import { AdaptivityProvider, AppRoot, ConfigProvider, SizeType } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { MainLayout } from './components/MainLayout';

const App = () => {
  return (
    <ConfigProvider>
      <AdaptivityProvider sizeX={SizeType.REGULAR} sizeY={SizeType.REGULAR}>
        <AppRoot>
          <MainLayout />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
