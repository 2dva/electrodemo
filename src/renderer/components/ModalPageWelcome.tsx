import { Button, ButtonGroup, Div, FormItem, FormLayout, Group, ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import { modalStore } from '../stores/modalStore';

interface Props {
  id: string;
}

export const ModalPageWelcome = ({ id }: Props) => {
  const clickOkHandler = () => {
    modalStore.closeModal();
  };
  const clickCancelHandler = () => {
    window.close();
  };

  return (
    <ModalPage
      id={id}
      header={<ModalPageHeader style={{ textAlign: 'center' }}>Welcome</ModalPageHeader>}
      hideCloseButton
    >
      <Group>
        <FormLayout>
          <Div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ textAlign: 'center', width: '100%' }}>Some text goes here</span>
          </Div>
          <FormItem>
            <ButtonGroup>
              <Button mode="primary" onClick={clickOkHandler} style={{ width: '90px' }}>
                OK
              </Button>
              <Button mode="outline" onClick={clickCancelHandler} style={{ width: '90px' }}>
                Cancel
              </Button>
            </ButtonGroup>
          </FormItem>
        </FormLayout>
      </Group>
    </ModalPage>
  );
};
