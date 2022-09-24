import { useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  FormItem,
  FormLayout,
  Group,
  ModalPage,
  ModalPageHeader,
  SizeType,
  Textarea,
} from '@vkontakte/vkui';
import { execDB } from '../stores/appStore';
import { modalStore } from '../stores/modalStore';

interface Props {
  id: string;
}
type IFormStatus = 'default' | 'error' | 'valid';

export const ModalPageImportTool = ({ id }: Props) => {
  const dataInput = useRef<HTMLTextAreaElement>(null);
  const [queryOutput, setQueryOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>('default');

  const clickClear = () => {
    setQueryOutput('');
    dataInput.current?.focus();
    setTimeout(() => {
      if (dataInput.current) {
        dataInput.current.value = '';
      }
    }, 10);
  };

  const clickOkHandler = () => {
    setLoading(true);
    const dataToImport = dataInput.current?.value;
    if (dataToImport) {
      execDB(dataToImport)
        .then((result) => {
          setLoading(false);
          setFormStatus(result === undefined ? 'error' : 'default');
          return setQueryOutput(result === undefined ? '[ERROR]' : JSON.stringify(result));
        })
        .catch(() => {});
    }
  };

  return (
    <ModalPage id={id} header={<ModalPageHeader>Import Tool</ModalPageHeader>} size="l" hideCloseButton>
      <Group>
        <FormLayout>
          <FormItem top="Input Data">
            <Textarea autoFocus getRef={dataInput} rows={3} sizeY={SizeType.COMPACT} />
          </FormItem>
          <FormItem top="Result">
            <Textarea value={queryOutput} rows={3} sizeY={SizeType.COMPACT} status={formStatus} />
          </FormItem>
          <FormItem>
            <ButtonGroup>
              <Button mode="primary" onClick={clickOkHandler} loading={loading}>
                Try Import
              </Button>
              <Button mode="outline" onClick={clickClear}>
                Clear
              </Button>
              <Button mode="outline" onClick={() => modalStore.closeModal()}>
                Close
              </Button>
            </ButtonGroup>
          </FormItem>
        </FormLayout>
      </Group>
    </ModalPage>
  );
};
