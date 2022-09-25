import {
  Button,
  ButtonGroup,
  Checkbox,
  ContentCard,
  CustomSelect,
  FormItem,
  FormLayoutGroup,
  Group,
  Header,
  Separator,
  SizeType,
  Text,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { appStore } from '../stores/appStore';
import { MODAL_PAGE_IMPORT_TOOL, MODAL_PAGE_OPEN_DB, MODAL_PAGE_QUERY_TOOL, modalStore } from '../stores/modalStore';
import { insertRecTestRows } from '../stores/recStore';

const countOptions = [
  { label: '10', value: 10 },
  { label: '100', value: 100 },
  { label: '1000', value: 1000 },
];

export const GroupSettingsDB = observer(() => {
  const [count, setCount] = useState(10);

  const insertTestRecords = () => {
    insertRecTestRows(count);
  };

  const openQueryTool = () => {
    modalStore.openModal(MODAL_PAGE_QUERY_TOOL);
  };

  const openImportTool = () => {
    modalStore.openModal(MODAL_PAGE_IMPORT_TOOL);
  };

  return (
    <Group header={<Header mode="secondary">Database</Header>}>
      <FormItem>
        <ButtonGroup>
          <Button onClick={() => modalStore.openModal(MODAL_PAGE_OPEN_DB)}>Open Database</Button>
          <Button
            onClick={() => appStore.closeDB()}
            disabled={!appStore.dbinfo.connected}
            before={<Icon24Cancel />}
            appearance="neutral"
            title="Close Database"
          />
        </ButtonGroup>
      </FormItem>
      <Checkbox
        style={{ margin: '0 15px 0 15px' }}
        sizeY={SizeType.COMPACT}
        checked={appStore.settings.restoreOnStartup}
        onChange={appStore.switchSettingRestore}
      >
        Restore connection on startup
      </Checkbox>
      <FormItem>
        {appStore.dbinfo.connected && (
          <ContentCard
            subtitle="Status: connected"
            header={appStore.dbinfo.fileName}
            caption={`${Math.round(appStore.dbinfo.fileSize / 1024)} Kb`}
            mode="tint"
          />
        )}
        {!appStore.dbinfo.connected && <ContentCard subtitle="Status: disconnected" mode="tint" />}
      </FormItem>
      <Separator />
      <FormLayoutGroup mode="horizontal" style={{ width: '302px' }}>
        <FormItem style={{ flexBasis: '156px', flexGrow: 1 }}>
          <Button style={{ height: '34px' }} onClick={() => insertTestRecords()} disabled={!appStore.dbinfo.connected}>
            Add N test records
          </Button>
        </FormItem>
        <FormItem style={{ flexBasis: '29px', flexGrow: 0 }}>
          <Text style={{ lineHeight: '34px' }}>N =</Text>
        </FormItem>
        <FormItem style={{ flexBasis: '90px', margin: 0 }}>
          <CustomSelect
            options={countOptions}
            sizeY={SizeType.COMPACT}
            defaultValue={10}
            mode="plain"
            onChange={(e) => setCount(+e.currentTarget.value)}
          />
        </FormItem>
      </FormLayoutGroup>
      <FormItem>
        <Button onClick={openQueryTool} disabled={!appStore.dbinfo.connected}>
          Query tool
        </Button>
      </FormItem>
      <FormItem>
        <Button onClick={openImportTool} disabled={!appStore.dbinfo.connected}>
          Import records
        </Button>
      </FormItem>
    </Group>
  );
});
