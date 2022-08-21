import {
  AdaptivityProvider,
  AppRoot,
  Button,
  ButtonGroup,
  Checkbox,
  ConfigProvider,
  CustomSelect,
  FormItem,
  Group,
  HorizontalScroll,
  Input,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  Panel,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Tabs,
  TabsItem,
  View,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';
import DataGrid from 'react-data-grid';
import { observer } from 'mobx-react';
import { modalStore } from './modalStore';
import { MODAL_PAGE_FILTERS } from './constants';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' },
];

const Scrollable = () => {
  const [mode, setMode] = React.useState('default');
  const [selected, setSelected] = React.useState('recs');
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Group>
      <Tabs mode="default">
        <HorizontalScroll arrowSize="m">
          <TabsItem
            selected={selected === 'recs'}
            onClick={() => setSelected('recs')}
          >
            Recs
          </TabsItem>
          <TabsItem
            selected={selected === 'groups'}
            onClick={() => setSelected('groups')}
          >
            Notes
          </TabsItem>
          <TabsItem
            selected={selected === 'recommendations'}
            disabled={disabled}
            onClick={() => setSelected('recommendations')}
          >
            Calendar
          </TabsItem>
          <TabsItem
            selected={selected === 'friends'}
            disabled={disabled}
            onClick={() => setSelected('friends')}
          >
            Other
          </TabsItem>
        </HorizontalScroll>
      </Tabs>
      <br />
      <View activePanel={selected}>
        <Panel id="recs">
          <Group>
            <DataGrid columns={columns} rows={rows} />
          </Group>
        </Panel>
        <Panel id="groups">
          <Group>
            <SimpleCell>GROUPS CELL</SimpleCell>
          </Group>
        </Panel>
      </View>

      <FormItem top="mode">
        <Button onClick={() => modalStore.openModal(MODAL_PAGE_FILTERS)}>
          Open Database
        </Button>
        <CustomSelect
          value={mode}
          options={[
            {
              label: 'default',
              value: 'default',
            },
            {
              label: 'accent',
              value: 'accent',
            },
            {
              label: 'secondary',
              value: 'secondary',
            },
          ]}
          onChange={(event) => setMode(event.target.value)}
        />
      </FormItem>
      <Checkbox onChange={() => setDisabled((prev) => !prev)}>
        disabled
      </Checkbox>
    </Group>
  );
};

const Example2 = observer(() => {
  const modal = (
    <ModalRoot activeModal={modalStore.modal.body}>
      <ModalPage
        id={MODAL_PAGE_FILTERS}
        onClose={() => modalStore.closeModal()}
        header={<ModalPageHeader>Фильтры</ModalPageHeader>}
      >
        <Group>
          <FormItem top="Путь к файлу">
            <Input type="text" defaultValue="" />
            <Checkbox>Создать если не найден</Checkbox>
          </FormItem>
          <FormItem>
            <ButtonGroup align="right" stretched>
              <Button mode="primary" onClick={() => modalStore.closeModal()}>
                Открыть
              </Button>
              <Button mode="outline" onClick={() => modalStore.closeModal()}>
                Отмена
              </Button>
            </ButtonGroup>
          </FormItem>
        </Group>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <AppRoot>
      <SplitLayout modal={modal}>
        <SplitCol>
          <Scrollable />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
});

export const VKDemo = () => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <Example2 />
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
