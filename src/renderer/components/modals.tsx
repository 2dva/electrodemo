import { useRef } from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormItem,
  Group,
  Input,
} from '@vkontakte/vkui';
import { dbStore } from 'renderer/stores/dbStore';
import { modalStore } from '../stores/modalStore';

export const ModalGroupOpenDB = () => {
  const textInput = useRef<HTMLInputElement>(null);

  const clickOkHandler = () => {
    // @ts-ignore
    dbStore.openDB(textInput.current.value);
    modalStore.closeModal();
  };

  return (
    <Group>
      <FormItem top="Путь к файлу">
        <Input getRef={textInput} type="text" defaultValue="" />
        <Checkbox>Создать если не найден</Checkbox>
      </FormItem>
      <FormItem>
        <ButtonGroup align="right" stretched>
          <Button mode="primary" onClick={clickOkHandler}>
            Открыть
          </Button>
          <Button mode="outline" onClick={() => modalStore.closeModal()}>
            Отмена
          </Button>
        </ButtonGroup>
      </FormItem>
    </Group>
  );
};
