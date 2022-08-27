import {
  Button,
  Caption,
  CustomSelect,
  FormItem,
  Group,
  Panel,
  Text,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { IPanelProps, MODAL_PAGE_OPEN_DB } from '../constants';
import { modalStore } from '../stores/modalStore';
import { dbStore } from '../stores/dbStore';

export const PanelSettings = observer(({ id }: IPanelProps) => {
  const [mode, setMode] = useState('default');

  return (
    <Panel id={id}>
      <Group>
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
        <FormItem>
          <Button onClick={() => modalStore.openModal(MODAL_PAGE_OPEN_DB)}>
            Open Database
          </Button>
        </FormItem>
        <Caption>{dbStore.info.fileName}</Caption>
        <Text>{dbStore.info.systemInfo}</Text>
      </Group>
    </Panel>
  );
});
