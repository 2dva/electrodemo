import React from 'react';
import {
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

export const TabsContainer = () => {
  const [selected, setSelected] = React.useState('recs');

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
            selected={selected === 'notes'}
            onClick={() => setSelected('notes')}
          >
            Notes
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
      <View activePanel={selected}>
        <PanelRecs id="recs" />
        <PanelSettings id="settings" />
        <Panel id="notes">
          <Group>
            <SimpleCell>NOTES CELL</SimpleCell>
          </Group>
        </Panel>
      </View>
    </Group>
  );
};
