import { Button, Div, Group, Panel } from '@vkontakte/vkui';
import DataGrid from 'react-data-grid';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import { useEffect } from 'react';
import { Icon24Add } from '@vkontakte/icons';
import { IPanelProps } from '../constants';
import { disconnectRec, fetchRecRows, openAddRecDialog, openEditRecDialog, recStore } from '../stores/recStore';
import { appStore } from '../stores/appStore';
import { IRecDB } from '../../commonConstants';

const columns = [
  { key: 'rec_id', name: 'Id', width: 30 },
  { key: 'date', name: 'Day', width: 100 },
  { key: 'cat_id', name: 'Category', width: 120 },
  { key: 'title', name: 'Title' },
];

const dgDarkClassName = 'rdg-dark';

export const PanelRecs = observer(({ id }: IPanelProps) => {
  useEffect(() => {
    fetchRecRows();
  }, []);

  const onRowDClick = (row: IRecDB) => {
    if (row.rec_id) {
      openEditRecDialog(row.rec_id);
    }
  };

  return (
    <Panel id={id}>
      <Group>
        <DataGrid
          columns={columns}
          rows={recStore.rows}
          className={appStore.settings.dark ? dgDarkClassName : ''}
          onRowDoubleClick={onRowDClick}
        />
      </Group>
      <Div style={{ position: 'absolute', right: '5px', bottom: '20px' }}>
        <Button
          size="l"
          before={<Icon24Add />}
          onClick={() => openAddRecDialog()}
          disabled={!appStore.dbinfo.connected}
        />
      </Div>
    </Panel>
  );
});

autorun(() => {
  console.log(`TabsContainer:autorun: on connected change (${appStore.dbinfo.connected})`);
  if (appStore.dbinfo.connected) {
    fetchRecRows();
  } else {
    disconnectRec();
  }
});
