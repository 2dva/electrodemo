import { FormItem, Group, Header, SimpleCell, SizeType, Switch } from '@vkontakte/vkui';
import { appStore } from '../stores/appStore';

export const GroupSettingsAppearance = () => {
  return (
    <Group header={<Header mode="secondary">Appearance</Header>}>
      <FormItem>
        <SimpleCell
          sizeY={SizeType.COMPACT}
          Component="label"
          after={<Switch defaultChecked={appStore.settings.dark} onChange={appStore.switchTheme} />}
        >
          Dark theme
        </SimpleCell>
      </FormItem>
    </Group>
  );
};
