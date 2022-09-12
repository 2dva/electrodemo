import { makeAutoObservable } from 'mobx';

export const MODAL_PAGE_WELCOME = 'page_welcome';
export const MODAL_PAGE_OPEN_DB = 'page_open_db';
export const MODAL_PAGE_EDIT_REC = 'page_rec_edit';

interface Modal {
  open: boolean;
  body: string | null;
  data: Record<string, unknown>;
}

type IToastStatus = 'default' | 'error' | 'valid';

interface IToast {
  open: boolean;
  text: string | null;
  status: IToastStatus;
}

export class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    data: {},
  };

  toast: IToast = {
    open: false,
    text: null,
    status: 'default',
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (activeModal: string, data: Record<string, unknown> = {}) => {
    this.modal.open = true;
    this.modal.body = activeModal;
    this.modal.data = { ...data };
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };

  showToast = (text: string, status: IToastStatus) => {
    this.toast.open = true;
    this.toast.text = text;
    this.toast.status = status;
  };

  hideToast = () => {
    this.toast.open = false;
  };
}

export const modalStore = new ModalStore();

export const showToastSuccess = () => {
  modalStore.showToast('Success!', 'valid');
};

export const showToastError = () => {
  modalStore.showToast('Error!', 'error');
};
