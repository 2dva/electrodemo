import { useEffect, useState } from 'react';
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
import { insertRecRow, loadRecData, recStore, updateRecRow } from '../stores/recStore';
import { CategoryArray, formatSQLDate, IRecItem } from '../../commonConstants';

interface Props {
  id: string;
}
type IFormStatus = 'default' | 'error' | 'valid';

const defaultRecValue: IRecItem = {
  recId: undefined,
  catId: 0,
  title: '',
  text: '',
  tags: '',
  date: new Date(),
};

const recordTypeOptions = CategoryArray.map((val, index) => {
  return { label: val, value: index };
});

export const ModalPageRecEdit = ({ id }: Props) => {
  const [formTitleStatus, setFormTitleStatus] = useState<IFormStatus>('default');
  const [recValue, setRecValue] = useState<IRecItem>(defaultRecValue);

  const validateForm = () => {
    return recValue.title !== '';
  };

  const clickOkHandler = () => {
    if (validateForm()) {
      const data: IRecItem = {
        recId: recValue.recId,
        catId: recValue.catId,
        title: recValue.title,
        text: recValue.text,
        tags: recValue.tags,
        date: recValue.date,
      };
      console.log('ON CLICK OK: date=', data.date);
      (data.recId ? updateRecRow(data) : insertRecRow(data))
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
      header={<ModalPageHeader>{recValue.recId ? `Record #${recValue.recId}` : 'New record'}</ModalPageHeader>}
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
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Title" status={formTitleStatus}>
              <Input
                type="text"
                sizeY={SizeType.COMPACT}
                value={recValue.title}
                autoFocus
                onChange={(e) => setRecValue({ ...recValue, title: e.target.value })}
              />
            </FormItem>
            <FormItem style={{ flexBasis: '80px', flexGrow: 0 }}>
              <Button
                size="m"
                onClick={(e) => {
                  e.preventDefault();
                  const title = `[${formatSQLDate(recValue.date)}] ${CategoryArray[recValue.catId]}`;
                  setRecValue({ ...recValue, title });
                }}
              >
                A
              </Button>
            </FormItem>
          </FormLayoutGroup>
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
                options={recordTypeOptions}
                value={recValue.catId}
                dropdownOffsetDistance={5}
                mode="plain"
                onChange={(e) => setRecValue({ ...recValue, catId: Number(e.target.value) })}
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
                {recValue.recId ? 'Save' : 'Add'}
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
