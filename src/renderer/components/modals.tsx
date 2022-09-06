import { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  CustomSelect,
  DateInput,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group,
  Input,
  SizeType,
  Textarea,
} from '@vkontakte/vkui';
import { appStore } from '../stores/appStore';
import { modalStore } from '../stores/modalStore';
import { recTypeOptions } from '../constants';

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
      <FormLayout
        onSubmit={(e) => {
          e.preventDefault();
          clickOkHandler();
        }}
      >
        <FormItem top="Path to file" status={formStatus}>
          <Input
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
  );
};

export const ModalGroupRecEdit = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const [formTitleStatus, setFormTitleStatus] = useState<IFormStatus>('default');
  const [value, setValue] = useState(new Date());

  const validateForm = () => {
    return !!titleInput.current?.value;
  };

  const clickOkHandler = () => {
    if (validateForm()) {
      modalStore.closeModal();
    } else {
      setFormTitleStatus('error');
    }
  };

  useEffect(() => {
    titleInput.current?.focus();
  }, []);

  return (
    <Group>
      <FormLayout
        onSubmit={(e) => {
          e.preventDefault();
          clickOkHandler();
        }}
      >
        <FormItem top="Title" status={formTitleStatus}>
          <Input
            getRef={titleInput}
            type="text"
            sizeY={SizeType.COMPACT}
            onChange={() => setFormTitleStatus('default')}
          />
        </FormItem>
        <FormLayoutGroup mode="horizontal">
          <FormItem top="Date">
            <DateInput value={value} showNeighboringMonth disableFuture />
          </FormItem>
          <FormItem top="Type">
            <CustomSelect options={recTypeOptions} value="note" dropdownOffsetDistance={5} mode="plain" />
          </FormItem>
        </FormLayoutGroup>
        <FormItem top="Description">
          <Textarea rows={3} sizeY={SizeType.COMPACT} />
        </FormItem>
        <FormItem top="Tags">
          <Input type="text" placeholder="Space-delimited tags" sizeY={SizeType.COMPACT} />
        </FormItem>
        <FormItem>
          <ButtonGroup align="right" stretched>
            <Button mode="primary" onClick={clickOkHandler}>
              Add
            </Button>
            <Button mode="outline" onClick={() => modalStore.closeModal()}>
              Cancel
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Group>
  );
};
