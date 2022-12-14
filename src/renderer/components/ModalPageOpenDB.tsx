import { useRef, useState } from 'react';
import { Button, ButtonGroup, FormItem, FormLayout, Group, Input, ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import { appStore } from '../stores/appStore';
import { modalStore } from '../stores/modalStore';

interface Props {
  id: string;
}
type IFormStatus = 'default' | 'error' | 'valid';
let lastInputFile = '';

export const ModalPageOpenDB = ({ id }: Props) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [formStatus, setFormStatus] = useState<IFormStatus>('default');

  const clickOkHandler = () => {
    const filePath = textInput.current?.value;
    if (filePath) {
      appStore
        .openDB(filePath)
        .then((success) => {
          if (success) {
            modalStore.closeModal();
          } else {
            lastInputFile = filePath;
            setFormStatus('error');
          }
          return true;
        })
        .catch(() => {});
    }
  };

  return (
    <ModalPage id={id} header={<ModalPageHeader>Open DB File</ModalPageHeader>} hideCloseButton>
      <Group>
        <FormLayout
          onSubmit={(e) => {
            e.preventDefault();
            clickOkHandler();
          }}
        >
          <FormItem top="Path to file" status={formStatus}>
            <Input
              autoFocus
              getRef={textInput}
              type="text"
              defaultValue={lastInputFile}
              onChange={() => setFormStatus('default')}
            />
          </FormItem>
          <FormItem>
            <ButtonGroup align="right" stretched>
              <Button mode="primary" onClick={clickOkHandler}>
                Open
              </Button>
              <Button mode="outline" onClick={() => modalStore.closeModal()}>
                Cancel
              </Button>
            </ButtonGroup>
          </FormItem>
        </FormLayout>
      </Group>
    </ModalPage>
  );
};
