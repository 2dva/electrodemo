import { makeAutoObservable } from 'mobx';

export const MODAL_PAGE_WELCOME = 'page_welcome';
export const MODAL_PAGE_OPEN_DB = 'page_open_db';
export const MODAL_PAGE_EDIT_REC = 'page_rec_edit';

interface Modal {
  open: boolean;
  body: string | null;
}

export class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (activeModal: string) => {
    this.modal.open = true;
    this.modal.body = activeModal;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}

export const modalStore = new ModalStore();
