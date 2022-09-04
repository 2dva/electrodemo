import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, FormItem, Group, Input } from '@vkontakte/vkui';
import { appStore } from '../stores/appStore';
import { modalStore } from '../stores/modalStore';

type IFormStatus = 'default' | 'error' | 'valid';
let lastInputFile = '';

export const ModalGroupOpenDB = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const [formStatus, setFormStatus] = useState<IFormStatus>('default');

  const clickOkHandler = () => {
    const filePath = textInput.current?.value;
    if (filePath) {
      appStore
        .openDB(filePath)
        .then((success) => {
          console.log('!!!!', success);
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

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  return (
    <Group>
      <FormItem top="Path to file" status={formStatus}>
        <Input getRef={textInput} type="text" defaultValue={lastInputFile} onChange={() => setFormStatus('default')} />
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
    </Group>
  );
};
