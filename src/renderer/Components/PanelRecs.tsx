import { Group, Panel } from '@vkontakte/vkui';
import DataGrid from 'react-data-grid';
import { IPanelProps } from '../constants';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' },
];

export const PanelRecs = ({ id }: IPanelProps) => {
  return (
    <Panel id={id}>
      <Group>
        <DataGrid columns={columns} rows={rows} />
      </Group>
    </Panel>
  );
};
