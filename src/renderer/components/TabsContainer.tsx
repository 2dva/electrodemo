import { useEffect, useState } from 'react';
import {
  Calendar,
  CustomSelect,
  FormItem,
  Group,
  HorizontalScroll,
  Panel,
  SimpleCell,
  Tabs,
  TabsItem,
  View,
} from '@vkontakte/vkui';
import { PanelRecs } from './PanelRecs';
import { PanelSettings } from './PanelSettings';
import { fetchRecRows } from '../stores/recStore';

export const TabsContainer = () => {
  const [selected, setSelected] = useState('recs');

  const openRecsTab = () => {
    setSelected('recs');
    fetchRecRows();
  };

  useEffect(() => {
    openRecsTab();
  }, []);

  return (
    <Group style={{ height: '100%' }}>
      <Tabs mode="default">
        <HorizontalScroll arrowSize="m">
          <TabsItem
            selected={selected === 'recs'}
            onClick={() => openRecsTab()}
          >
            Recs
          </TabsItem>
          <TabsItem
            selected={selected === 'demo'}
            onClick={() => setSelected('demo')}
          >
            Demo
          </TabsItem>
          <TabsItem
            selected={selected === 'calendar'}
            onClick={() => setSelected('calendar')}
          >
            Calendar
          </TabsItem>
          <TabsItem
            selected={selected === 'settings'}
            onClick={() => setSelected('settings')}
          >
            Settings
          </TabsItem>
        </HorizontalScroll>
      </Tabs>
      <br />
      <View activePanel={selected} style={{ bottom: 0, left: 0 }}>
        <PanelRecs id="recs" />
        <PanelSettings id="settings" />
        <Panel id="demo">
          <Group>
            <SimpleCell>DEMO CELL</SimpleCell>
            <FormItem top="mode">
              <CustomSelect
                value="default"
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
              />
            </FormItem>
          </Group>
        </Panel>
        <Panel id="calendar" centered>
          <Group>
            <Calendar enableTime disablePickers showNeighboringMonth size="m" />
          </Group>
        </Panel>
      </View>
    </Group>
  );
};
