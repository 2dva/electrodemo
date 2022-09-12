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
import { modalStore, showToastError, showToastSuccess } from '../stores/modalStore';
import { recTypeOptions } from '../constants';
import { insertRecRow, loadRecData, recStore, updateRecRow } from '../stores/recStore';
import { IRecItem } from '../../commonConstants';

interface Props {
  id: string;
}
type IFormStatus = 'default' | 'error' | 'valid';

const defaultRecValue: IRecItem = {
  recId: 0,
  catId: 1,
  title: '',
  text: '',
  tags: '',
  date: new Date(),
};

export const ModalPageRecEdit = ({ id }: Props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const catSelect = useRef<HTMLSelectElement>(null);
  const [formTitleStatus, setFormTitleStatus] = useState<IFormStatus>('default');
  const [value, setValue] = useState(new Date());
  const [catValue, setCatValue] = useState<string>('1');
  const [recValue, setRecValue] = useState<IRecItem>(defaultRecValue);

  const validateForm = () => {
    return recValue.title !== '';
  };

  const clickOkHandler = () => {
    if (validateForm()) {
      const data: IRecItem = {
        recId: recStore.recId,
        catId: Number(catValue) || 1,
        title: recValue.title,
        text: recValue.text,
        tags: recValue.tags,
        date: recValue.date,
      };
      console.log('ON CLICK OK: date=', data.date);
      (recStore.recId ? updateRecRow(data) : insertRecRow(data))
        .then((success) => {
          if (success) {
            modalStore.closeModal();
            showToastSuccess();
          } else {
            showToastError();
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
    if (recStore.recId) {
      loadRecData(recStore.recId)
        .then((recItem) => {
          setRecValue(recItem as IRecItem);
          return true;
        })
        .catch(() => {});
    }
  }, []);

  const onPageClose = () => {
    console.log('MODAL:INSIDE:CLOSE_HANDLER');
    recStore.resetRow();
  };

  return (
    <ModalPage
      id={id}
      onClose={onPageClose}
      onClosed={onPageClose}
      header={<ModalPageHeader>{recStore.recId ? `Record #${recStore.recId}` : 'New record'}</ModalPageHeader>}
      hideCloseButton
      size="l"
    >
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
              value={recValue.title}
              onChange={(e) => setRecValue({ ...recValue, title: e.target.value })}
            />
          </FormItem>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Date">
              <DateInput
                value={recValue.date}
                onChange={(date) => {
                  console.log('DATE ONCHANGE value=', date);
                  setRecValue({ ...recValue, date });
                }}
                showNeighboringMonth
                disableFuture
              />
            </FormItem>
            <FormItem top="Type">
              <CustomSelect
                getRef={catSelect}
                options={recTypeOptions}
                value={catValue}
                dropdownOffsetDistance={5}
                mode="plain"
                onChange={(e) => setCatValue(e.target.value)}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem top="Description">
            <Textarea
              value={recValue.text}
              rows={3}
              sizeY={SizeType.COMPACT}
              onChange={(e) => setRecValue({ ...recValue, text: e.target.value })}
            />
          </FormItem>
          <FormItem top="Tags">
            <Input
              value={recValue.tags}
              type="text"
              onChange={(e) => setRecValue({ ...recValue, tags: e.target.value })}
              placeholder="Space-delimited tags"
              sizeY={SizeType.COMPACT}
            />
          </FormItem>
          <FormItem>
            <ButtonGroup align="right" stretched>
              <Button mode="primary" onClick={clickOkHandler}>
                {recStore.recId ? 'Save' : 'Add'}
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
