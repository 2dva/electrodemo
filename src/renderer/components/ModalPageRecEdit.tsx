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
import { insertRecRow } from '../stores/recStore';
import { IRecItem } from '../../commonConstants';

interface Props {
  id: string;
  onClose: VoidFunction;
}
type IFormStatus = 'default' | 'error' | 'valid';

export const ModalPageRecEdit = ({ id, onClose }: Props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLTextAreaElement>(null);
  const tagsInput = useRef<HTMLInputElement>(null);
  const catSelect = useRef<HTMLSelectElement>(null);
  const [formTitleStatus, setFormTitleStatus] = useState<IFormStatus>('default');
  const [value, setValue] = useState(new Date());

  const validateForm = () => {
    return !!titleInput.current?.value;
  };

  const clickOkHandler = () => {
    if (validateForm()) {
      const data = {
        catId: Number(catSelect.current?.value || 0),
        title: titleInput.current?.value || '',
        text: textInput.current?.value || '',
        tags: tagsInput.current?.value || '',
      };
      insertRecRow(data as IRecItem)
        .then((success) => {
          if (success) {
            modalStore.closeModal();
          } else {
            setFormTitleStatus('error');
          }
          return true;
        })
        .catch(() => {});
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
              <CustomSelect
                getRef={catSelect}
                options={recTypeOptions}
                defaultValue="note"
                dropdownOffsetDistance={5}
                mode="plain"
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem top="Description">
            <Textarea getRef={textInput} rows={3} sizeY={SizeType.COMPACT} />
          </FormItem>
          <FormItem top="Tags">
            <Input getRef={tagsInput} type="text" placeholder="Space-delimited tags" sizeY={SizeType.COMPACT} />
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
