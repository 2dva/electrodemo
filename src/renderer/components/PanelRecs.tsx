import { Group, Panel } from '@vkontakte/vkui';
import DataGrid from 'react-data-grid';
import { observer } from 'mobx-react';
import { IPanelProps } from '../constants';
import { recStore } from '../stores/recStore';
import { dbStore } from '../stores/dbStore';

const columns = [
  { key: 'rec_id', name: 'Id', width: 30 },
  { key: 'date', name: 'Day', width: 100 },
  { key: 'cat_id', name: 'Category', width: 120 },
  { key: 'title', name: 'Title' },
];

const dgDarkClassName = 'rdg-dark';

export const PanelRecs = observer(({ id }: IPanelProps) => {
  return (
    <Panel id={id}>
      <Group>
        <DataGrid columns={columns} rows={recStore.rows} className={dbStore.settings.dark ? dgDarkClassName : ''} />
      </Group>
    </Panel>
  );
});
