import { observer } from 'mobx-react';
import { ModalPage, ModalPageHeader, ModalRoot, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { modalStore } from '../stores/modalStore';
import { MODAL_PAGE_EDIT_REC, MODAL_PAGE_OPEN_DB } from '../constants';
import { ModalGroupOpenDB, ModalGroupRecEdit } from './modals';
import { TabsContainer } from './TabsContainer';

export const MainLayout = observer(() => {
  const modal = (
    <ModalRoot activeModal={modalStore.modal.body}>
      <ModalPage
        id={MODAL_PAGE_OPEN_DB}
        onClose={() => modalStore.closeModal()}
        header={<ModalPageHeader>Open DB File</ModalPageHeader>}
        hideCloseButton
      >
        <ModalGroupOpenDB />
      </ModalPage>
      <ModalPage
        id={MODAL_PAGE_EDIT_REC}
        onClose={() => modalStore.closeModal()}
        header={<ModalPageHeader>Add rec</ModalPageHeader>}
        hideCloseButton
        size="l"
      >
        <ModalGroupRecEdit />
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
