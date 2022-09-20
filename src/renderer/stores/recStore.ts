import { makeAutoObservable } from 'mobx';
import { executeRemoteFunction } from '../simpleBridge';
import { IRecDB, IRecItem } from '../../commonConstants';
import { MODAL_PAGE_EDIT_REC, modalStore } from './modalStore';
import { DEFAULT_ROW_LIMIT } from '../constants';

export class RecStore {
  rows: Array<IRecDB> = [];

  recId: number | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setRows = (rows: Array<IRecDB>) => {
    this.rows = rows;
  };

  setActiveRow = (recId: number | undefined) => {
    this.recId = recId;
  };

  resetRow = () => {
    this.setActiveRow(undefined);
  };
}

export const recStore = new RecStore();

export const openAddRecDialog = () => {
  recStore.setActiveRow(undefined);
  modalStore.openModal(MODAL_PAGE_EDIT_REC);
};

export const openEditRecDialog = (recId: number) => {
  recStore.setActiveRow(recId);
  modalStore.openModal(MODAL_PAGE_EDIT_REC);
};

export const disconnectRec = () => {
  recStore.setRows([]);
};

export const fetchRecRows = (limit: number = DEFAULT_ROW_LIMIT) => {
  executeRemoteFunction('fetchRecRows', { limit })
    .then((result) => {
      return recStore.setRows(result as Array<IRecDB>);
    })
    .catch(() => {});
};

export const loadRecData = (recId: number) => {
  return executeRemoteFunction('fetchRecRow', { recId })
    .then((value) => {
      const result = value as IRecDB;
      console.log('RecEdit:got data:', result);
      const recItem: IRecItem = {
        recId: result.rec_id,
        catId: result.cat_id,
        title: result.title,
        text: result.text,
        tags: result.tags,
        date: new Date(result.date) || undefined,
      };
      return recItem;
    })
    .catch(() => {});
};

export const insertRecRow = (data: IRecItem) => {
  return executeRemoteFunction('insertRecRow', data)
    .then((result) => {
      fetchRecRows();
      return !!result;
    })
    .catch(() => {});
};

export const updateRecRow = (data: IRecItem) => {
  return executeRemoteFunction('updateRecRow', data)
    .then((result) => {
      fetchRecRows();
      return !!result;
    })
    .catch(() => {});
};

export const deleteRec = (recId: number) => {
  return executeRemoteFunction('deleteRec', { recId })
    .then((result) => {
      fetchRecRows();
      return !!result;
    })
    .catch(() => {});
};

export const insertRecTestRows = (n: number) => {
  executeRemoteFunction('insertRecTestRows', { n }).catch(() => {});
};
