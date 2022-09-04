import { useState } from 'react';
import { Calendar, Group, HorizontalScroll, Panel, Tabs, TabsItem, View } from '@vkontakte/vkui';
import { PanelRecs } from './PanelRecs';
import { PanelSettings } from './PanelSettings';
import { PanelDemo } from './PanelDemo';

export const TabsContainer = () => {
  const [selected, setSelected] = useState('recs');

  return (
    <Group style={{ height: '100%' }}>
      <Tabs mode="default">
        <HorizontalScroll arrowSize="m">
          <TabsItem selected={selected === 'recs'} onClick={() => setSelected('recs')}>
            Recs
          </TabsItem>
          <TabsItem selected={selected === 'demo'} onClick={() => setSelected('demo')}>
            Demo
          </TabsItem>
          <TabsItem selected={selected === 'calendar'} onClick={() => setSelected('calendar')}>
            Calendar
          </TabsItem>
          <TabsItem selected={selected === 'settings'} onClick={() => setSelected('settings')}>
            Settings
          </TabsItem>
        </HorizontalScroll>
      </Tabs>
      <br />
      <View activePanel={selected} style={{ bottom: 0, left: 0 }}>
        <PanelRecs id="recs" />
        <PanelSettings id="settings" />
        <PanelDemo id="demo" />
        <Panel id="calendar" centered>
          <Group>
            <Calendar enableTime disablePickers showNeighboringMonth size="m" />
          </Group>
        </Panel>
      </View>
    </Group>
  );
};
