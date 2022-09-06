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
  ModalPage,
  ModalPageHeader,
  SizeType,
  Textarea,
} from '@vkontakte/vkui';
import { modalStore } from '../stores/modalStore';
import { recTypeOptions } from '../constants';

interface Props {
  id: string;
  onClose: VoidFunction;
}
type IFormStatus = 'default' | 'error' | 'valid';

export const ModalPageRecEdit = ({ id, onClose }: Props) => {
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
    <ModalPage id={id} onClose={onClose} header={<ModalPageHeader>Add rec</ModalPageHeader>} hideCloseButton size="l">
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
    </ModalPage>
  );
};
