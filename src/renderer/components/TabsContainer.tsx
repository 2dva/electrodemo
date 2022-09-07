import { ReactNode, useState } from 'react';
import { Calendar, Group, Panel, Tabs, TabsItem, View } from '@vkontakte/vkui';
import { PanelRecs } from './PanelRecs';
import { PanelSettings } from './PanelSettings';
import { PanelDemo } from './PanelDemo';

const ALLTABS: Record<string, string> = {
  recs: 'Recs',
  demo: 'Demo',
  calendar: 'Calendar',
  settings: 'Settings',
};

export const TabsContainer = () => {
  const [selected, setSelected] = useState('recs');
  const tabs: Array<ReactNode> = Object.keys(ALLTABS).map((tab) => {
    return (
      <TabsItem key={tab} selected={selected === tab} onClick={() => setSelected(tab)}>
        {ALLTABS[tab]}
      </TabsItem>
    );
  });

  return (
    <Group>
      <Tabs mode="default">{tabs}</Tabs>
      <View activePanel={selected}>
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
