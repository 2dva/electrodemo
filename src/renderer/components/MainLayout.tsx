import { observer } from 'mobx-react';
import { ModalRoot, SplitCol, SplitLayout } from '@vkontakte/vkui';
import {
  MODAL_PAGE_EDIT_REC,
  MODAL_PAGE_OPEN_DB,
  MODAL_PAGE_QUERY_TOOL,
  MODAL_PAGE_WELCOME,
  modalStore,
} from '../stores/modalStore';
import { TabsContainer } from './TabsContainer';
import { ModalPageOpenDB } from './ModalPageOpenDB';
import { ModalPageRecEdit } from './ModalPageRecEdit';
import { ModalPageWelcome } from './ModalPageWelcome';
import { Toast } from './Toast';
import { ModalPageQueryTool } from './ModalPageQueryTool';

export const MainLayout = observer(() => {
  const modal = (
    <ModalRoot activeModal={modalStore.modal.body} onClose={() => modalStore.closeModal()}>
      <ModalPageWelcome id={MODAL_PAGE_WELCOME} />
      <ModalPageOpenDB id={MODAL_PAGE_OPEN_DB} />
      <ModalPageRecEdit id={MODAL_PAGE_EDIT_REC} />
      <ModalPageQueryTool id={MODAL_PAGE_QUERY_TOOL} />
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal}>
      <SplitCol>
        <TabsContainer />
        <Toast />
      </SplitCol>
    </SplitLayout>
  );
});
