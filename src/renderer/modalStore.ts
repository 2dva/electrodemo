import { makeAutoObservable } from 'mobx';

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
    console.log('@stor: setting modal.body=', activeModal);

    this.modal.body = activeModal;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}

export const modalStore = new ModalStore();
