import { Button, ButtonGroup, Div, FormItem, FormLayout, Group, ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import { CSSProperties } from 'react';
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
  const alignCenterStyle: CSSProperties = { textAlign: 'center' };

  return (
    <ModalPage id={id} header={<ModalPageHeader style={alignCenterStyle}>Welcome</ModalPageHeader>} hideCloseButton>
      <Group>
        <FormLayout>
          <Div style={alignCenterStyle}>
            <span>You are entering demo mode!</span>
          </Div>
          <FormItem style={alignCenterStyle}>
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
