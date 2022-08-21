import {
  AppRoot,
  Epic,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  useAdaptivity,
  View,
  ViewWidth,
} from '@vkontakte/vkui';
import React from 'react';
import { Icon28MessageOutline, Icon28ServicesOutline } from '@vkontakte/icons';

export const Example = () => {
  const { viewWidth } = useAdaptivity();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const platform = usePlatform();
  const [activeStory, setActiveStory] = React.useState('profile');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const onStoryChange = (e: any) =>
    setActiveStory(e.currentTarget.dataset.story);
  // const isDesktop = viewWidth >= ViewWidth.TABLET;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const hasHeader = platform !== 'VKCOM';

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
          <Epic
            activeStory={activeStory}
            tabbar={
              <Tabbar>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'feed'}
                  data-story="recs"
                  text="Recs"
                />
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'services'}
                  data-story="services"
                  text="Notes"
                />
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'messages'}
                  data-story="messages"
                  text="Calendar"
                />
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'clips'}
                  data-story="clips"
                  text="Other"
                />
              </Tabbar>
            }
          >
            <View id="recs" activePanel="recs">
              <Panel id="recs">
                <PanelHeader>Recs</PanelHeader>
                <Group style={{ height: '400px' }}>
                  <SimpleCell>To be placed components</SimpleCell>
                </Group>
              </Panel>
            </View>
            <View id="services" activePanel="services">
              <Panel id="services">
                <PanelHeader before={<PanelHeaderBack />}>Сервисы</PanelHeader>
                <Group style={{ height: '400px' }}>
                  <Placeholder
                    icon={<Icon28ServicesOutline width={56} height={56} />}
                  />
                </Group>
              </Panel>
            </View>
            <View id="messages" activePanel="messages">
              <Panel id="messages">
                <PanelHeader before={<PanelHeaderBack />}>
                  Сообщения
                </PanelHeader>
                <Group style={{ height: '1000px' }}>
                  <Placeholder
                    icon={<Icon28MessageOutline width={56} height={56} />}
                  />
                </Group>
              </Panel>
            </View>
            <View id="clips" activePanel="clips">
              <Panel id="clips">
                <PanelHeader>VKUI</PanelHeader>
                <Group header={<Header mode="secondary">Items</Header>}>
                  <SimpleCell>Hello</SimpleCell>
                  <SimpleCell>World</SimpleCell>
                </Group>
              </Panel>
            </View>
          </Epic>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};
