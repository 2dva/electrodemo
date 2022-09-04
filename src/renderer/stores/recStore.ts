import { makeAutoObservable } from 'mobx';
import { executeRemoteFunction } from '../simpleBridge';

export class RecStore {
  rows: Array<unknown> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setRows = (rows: Array<unknown>) => {
    this.rows = rows;
  };
}

export const recStore = new RecStore();

export const disconnectRec = () => {
  recStore.setRows([]);
};

export const fetchRecRows = () => {
  executeRemoteFunction('fetchRecRows', {})
    .then((result) => {
      return recStore.setRows(result as Array<unknown>);
    })
    .catch(() => {});
};

export const insertRecTestRows = (n: number) => {
  executeRemoteFunction('insertRecTestRows', { n }).catch(() => {});
};
