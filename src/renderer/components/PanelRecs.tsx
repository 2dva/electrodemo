import {
  ActionSheet,
  ActionSheetDefaultIosCloseItem,
  ActionSheetItem,
  Button,
  CustomSelect,
  Div,
  FormItem,
  FormLayoutGroup,
  Group,
  Input,
  Panel,
  SegmentedControl,
  SizeType,
} from '@vkontakte/vkui';
import DataGrid, { FormatterProps } from 'react-data-grid';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import { ReactNode, useEffect, useState } from 'react';
import { Icon16MoreVertical, Icon24Add, Icon24Cancel } from '@vkontakte/icons';
import { ToggleRef } from '@vkontakte/vkui/dist/components/ActionSheet/types';
import { DEFAULT_ROW_LIMIT, IPanelProps } from '../constants';
import { disconnectRec, fetchRecRows, openAddRecDialog, openEditRecDialog, recStore } from '../stores/recStore';
import { appStore } from '../stores/appStore';
import { CategoryArray, IRecDB } from '../../commonConstants';
import { modalStore } from '../stores/modalStore';

const dgDarkClassName = 'rdg-dark';

const categoryOptions = CategoryArray.map((val, index) => {
  return { label: val, value: index };
});
categoryOptions.unshift({ label: 'all', value: -1 });

const visibleRowCountOptions = [
  { label: 'All', value: -1 },
  { label: '250', value: 250 },
  { label: '100', value: 100 },
  { label: '25', value: 25 },
];

const onClose = () => modalStore.closePopout();

const showRowMenu = (targetNode: EventTarget, recId: number) => {
  console.log('context menu for row', recId);
  modalStore.openPopout(
    <ActionSheet
      iosCloseItem={<ActionSheetDefaultIosCloseItem />}
      onClose={onClose}
      toggleRef={targetNode as ToggleRef}
    >
      <ActionSheetItem onClick={openAddRecDialog} autoclose>
        Add record
      </ActionSheetItem>
      <ActionSheetItem onClick={() => openEditRecDialog(recId)} autoclose>
        Edit record
      </ActionSheetItem>
      <ActionSheetItem autoclose>Delete record</ActionSheetItem>
    </ActionSheet>
  );
};

const catFormatter = (column: FormatterProps<IRecDB>): string => {
  return CategoryArray[column.row.cat_id] || '[unknown]';
};

const actionFormatter = (column: FormatterProps<IRecDB>): ReactNode => {
  const recId = column.row.rec_id;
  return (
    <Button
      before={<Icon16MoreVertical />}
      sizeY={SizeType.COMPACT}
      mode="tertiary"
      appearance="neutral"
      value={recId}
      data={`${recId}`}
      onClick={(e) => recId && showRowMenu(e.target, recId)}
    />
  );
};

const columns = [
  { key: 'rec_id', name: 'Id', width: 30 },
  { key: 'date', name: 'Day', width: 100 },
  { key: 'cat_id', name: 'Category', width: 120, formatter: catFormatter },
  { key: 'title', name: 'Title' },
  { key: 'action', name: '', width: 80, formatter: actionFormatter },
];

export const PanelRecs = observer(({ id }: IPanelProps) => {
  const [category, setCategory] = useState<number>(-1);
  const [rowCount, setRowCount] = useState(DEFAULT_ROW_LIMIT);

  const onRowDClick = (row: IRecDB) => {
    if (row.rec_id) {
      openEditRecDialog(row.rec_id);
    }
  };

  const resetFilters = () => {
    setCategory(-1);
  };

  useEffect(() => {
    fetchRecRows(rowCount);
  }, [rowCount]);

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
          <FormItem style={{ flexBasis: '250px', flexGrow: 0 }}>
            <SegmentedControl
              style={{ width: '250px' }}
              size="m"
              value={rowCount}
              onChange={(val) => setRowCount(val as number)}
              options={visibleRowCountOptions}
            />
          </FormItem>
          <FormItem style={{ flexBasis: '120px', flexGrow: 0 }}>
            <CustomSelect
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(+e.target.value)}
              sizeY={SizeType.COMPACT}
            />
          </FormItem>
          <FormItem>
            <Input type="text" placeholder="Search tags" sizeY={SizeType.COMPACT} />
          </FormItem>
          <FormItem style={{ flexBasis: '60px', flexGrow: 0 }}>
            <Button
              size="m"
              sizeX={SizeType.REGULAR}
              style={{ width: '36px' }}
              mode="outline"
              appearance="neutral"
              onClick={resetFilters}
              before={<Icon24Cancel />}
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
