import { observer } from 'mobx-react';
import { ModalRoot, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { MODAL_PAGE_EDIT_REC, MODAL_PAGE_OPEN_DB, modalStore } from '../stores/modalStore';
import { TabsContainer } from './TabsContainer';
import { ModalPageOpenDB } from './ModalPageOpenDB';
import { ModalPageRecEdit } from './ModalPageRecEdit';

export const MainLayout = observer(() => {
  const modal = (
    <ModalRoot activeModal={modalStore.modal.body}>
      <ModalPageOpenDB id={MODAL_PAGE_OPEN_DB} onClose={() => modalStore.closeModal()} />
      <ModalPageRecEdit id={MODAL_PAGE_EDIT_REC} onClose={() => modalStore.closeModal()} />
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
