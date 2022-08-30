import { Button, Caption, FormItem, Group, Panel, Text } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import { IPanelProps, MODAL_PAGE_OPEN_DB } from '../constants';
import { modalStore } from '../stores/modalStore';
import { dbStore } from '../stores/dbStore';

export const PanelSettings = observer(({ id }: IPanelProps) => {
  return (
    <Panel id={id}>
      <Group>
        <FormItem>
          <Button onClick={() => modalStore.openModal(MODAL_PAGE_OPEN_DB)}>Open Database</Button>
        </FormItem>
        <Caption>{dbStore.info.fileName}</Caption>
        <Text>{dbStore.info.systemInfo}</Text>
      </Group>
    </Panel>
  );
});
