import {
  AdaptivityProvider,
  AppRoot,
  Checkbox,
  ConfigProvider,
  CustomSelect,
  FormItem,
  Group,
  HorizontalScroll,
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
            <SimpleCell>RECS CELL</SimpleCell>
          </Group>
        </Panel>
        <Panel id="groups">
          <Group>
            <SimpleCell>GROUPS CELL</SimpleCell>
          </Group>
        </Panel>
      </View>

      <FormItem top="mode">
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

const Example2 = () => {
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol>
          <Scrollable />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export const VKDemo = () => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <Example2 />
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
