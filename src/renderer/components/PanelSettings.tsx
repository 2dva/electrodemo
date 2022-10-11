import { Cell, Group, Panel, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { useState } from 'react';
import { IPanelProps } from '../constants';
import { GroupSettingsAppearance } from './GroupSettingsAppearance';
import { GroupSettingsDB } from './GroupSettingsDB';

const panels = ['Database', 'Appearance'];

export const PanelSettings = ({ id }: IPanelProps) => {
  const [panel, setPanel] = useState(panels[0]);
  const activeCellStyle = {
    backgroundColor: 'var(--vkui--color_background_secondary)',
    borderRadius: 8,
  };

  return (
    <SplitLayout style={{ justifyContent: 'center' }} id={id}>
      <SplitCol width={180} maxWidth={180}>
        <Panel>
          <Group>
            {panels.map((i) => (
              <Cell
                key={i}
                disabled={i === panel}
                style={i === panel ? activeCellStyle : {}}
                onClick={() => setPanel(i)}
              >
                {i}
              </Cell>
            ))}
          </Group>
        </Panel>
      </SplitCol>
      <SplitCol spaced>
        <View activePanel={panel}>
          <Panel id={panels[0]}>
            <GroupSettingsDB />
          </Panel>
          <Panel id={panels[1]}>
            <GroupSettingsAppearance />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
