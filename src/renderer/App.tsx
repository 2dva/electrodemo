import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  SplitCol,
  SplitLayout,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { observer } from 'mobx-react';
import { modalStore } from './modalStore';
import { MODAL_PAGE_OPEN_DB } from './constants';
import { ModalGroupOpenDB } from './Components/modals';
import { TabsContainer } from './Components/TabsContainer';

const MainLayout = observer(() => {
  const modal = (
    <ModalRoot activeModal={modalStore.modal.body}>
      <ModalPage
        id={MODAL_PAGE_OPEN_DB}
        onClose={() => modalStore.closeModal()}
        header={<ModalPageHeader>Открыть файл БД</ModalPageHeader>}
      >
        <ModalGroupOpenDB />
      </ModalPage>
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal}>
      <SplitCol>
        <TabsContainer />
      </SplitCol>
    </SplitLayout>
  );
});

export const App = () => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <MainLayout />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
