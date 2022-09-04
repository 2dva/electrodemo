import { observer } from 'mobx-react';
import { ModalPage, ModalPageHeader, ModalRoot, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { modalStore } from '../stores/modalStore';
import { MODAL_PAGE_OPEN_DB } from '../constants';
import { ModalGroupOpenDB } from './modals';
import { TabsContainer } from './TabsContainer';

export const MainLayout = observer(() => {
  const modal = (
    <ModalRoot activeModal={modalStore.modal.body}>
      <ModalPage
        id={MODAL_PAGE_OPEN_DB}
        onClose={() => modalStore.closeModal()}
        header={<ModalPageHeader>Open DB File</ModalPageHeader>}
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
