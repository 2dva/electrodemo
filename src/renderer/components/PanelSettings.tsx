import {
  Button,
  ContentCard,
  FormItem,
  Group,
  Header,
  Panel,
  SimpleCell,
  SizeType,
  Switch,
  Text,
} from '@vkontakte/vkui';
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
        <FormItem>
          {dbStore.info.connected && (
            <ContentCard
              subtitle="Status: connected"
              header={dbStore.info.fileName}
              caption={`${Math.round(dbStore.info.fileSize / 1024)} Kb`}
              mode="tint"
            />
          )}
          {!dbStore.info.connected && <ContentCard subtitle="Status: disconnected" mode="tint" />}
        </FormItem>
        <Text>{dbStore.info.systemInfo}</Text>
      </Group>
      <Group header={<Header mode="secondary">Appearance</Header>}>
        <FormItem>
          <SimpleCell
            sizeY={SizeType.COMPACT}
            Component="label"
            after={<Switch defaultChecked={dbStore.settings.dark} onChange={dbStore.switchTheme} />}
          >
            Dark theme
          </SimpleCell>
        </FormItem>
      </Group>
    </Panel>
  );
});
