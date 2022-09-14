import {
  Button,
  CustomSelect,
  Div,
  FormItem,
  FormLayoutGroup,
  Group,
  Panel,
  SegmentedControl,
  SizeType,
} from '@vkontakte/vkui';
import DataGrid, { FormatterProps } from 'react-data-grid';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import { useEffect, useState } from 'react';
import { Icon24Add } from '@vkontakte/icons';
import { IPanelProps } from '../constants';
import { disconnectRec, fetchRecRows, openAddRecDialog, openEditRecDialog, recStore } from '../stores/recStore';
import { appStore } from '../stores/appStore';
import { CategoryArray, IRecDB } from '../../commonConstants';

const catFormatter = (column: FormatterProps<IRecDB>): string => {
  return CategoryArray[column.row.cat_id] || '[unknown]';
};

const columns = [
  { key: 'rec_id', name: 'Id', width: 30 },
  { key: 'date', name: 'Day', width: 100 },
  { key: 'cat_id', name: 'Category', width: 120, formatter: catFormatter },
  { key: 'title', name: 'Title' },
];

const dgDarkClassName = 'rdg-dark';

const recordTypeOptions = CategoryArray.map((val, index) => {
  return { label: val, value: index };
});
recordTypeOptions.unshift({ label: 'all', value: -1 });

const visibleRowCountOptions = [
  { label: 'All', value: 'all' },
  { label: '250', value: '250' },
  { label: '100', value: '100' },
  { label: '25', value: '25' },
];
const defaultVisibleRowCount = '25';

export const PanelRecs = observer(({ id }: IPanelProps) => {
  useEffect(() => {
    fetchRecRows();
  }, []);

  const onRowDClick = (row: IRecDB) => {
    if (row.rec_id) {
      openEditRecDialog(row.rec_id);
    }
  };

  const [rowCount, setRowCount] = useState(defaultVisibleRowCount);

  return (
    <Panel id={id}>
      <Group style={{ boxShadow: 'none' }}>
        <DataGrid
          style={{ height: '420px' }}
          columns={columns}
          rows={recStore.rows}
          className={appStore.settings.dark ? dgDarkClassName : ''}
          onRowDoubleClick={onRowDClick}
        />
        <Div style={{ position: 'absolute', right: '5px', bottom: '20px', zIndex: 1 }}>
          <Button
            size="l"
            before={<Icon24Add />}
            onClick={() => openAddRecDialog()}
            disabled={!appStore.dbinfo.connected}
          />
        </Div>
      </Group>
      <Group>
        <FormLayoutGroup mode="horizontal">
          <FormItem bottom={`Show ${rowCount} rows`}>
            <SegmentedControl
              style={{ width: '250px', height: '30px' }}
              size="m"
              name="rowCount"
              value={rowCount}
              onChange={(val) => setRowCount(val as string)}
              options={visibleRowCountOptions}
            />
          </FormItem>
          <FormItem>
            <CustomSelect
              options={recordTypeOptions}
              defaultValue="-1"
              align="left"
              // style={{ width: '250px', height: '40px' }}
              sizeY={SizeType.COMPACT}
              dropdownOffsetDistance={5}
              mode="plain"
            />
          </FormItem>
        </FormLayoutGroup>
      </Group>
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
