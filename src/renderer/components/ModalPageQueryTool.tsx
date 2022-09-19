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

export const ModalPageQueryTool = ({ id }: Props) => {
  const queryInput = useRef<HTMLTextAreaElement>(null);
  const [queryOutput, setQueryOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>('default');

  const clickClear = () => {
    setQueryOutput('');
    queryInput.current?.focus();
    setTimeout(() => {
      if (queryInput.current) {
        queryInput.current.value = '';
      }
    }, 10);
  };

  const clickOkHandler = () => {
    setLoading(true);
    const queryString = queryInput.current?.value;
    if (queryString) {
      execDB(queryString)
        .then((result) => {
          setLoading(false);
          setFormStatus(result === undefined ? 'error' : 'default');
          return setQueryOutput(result === undefined ? '[ERROR]' : JSON.stringify(result));
        })
        .catch(() => {});
    }
  };

  return (
    <ModalPage id={id} header={<ModalPageHeader>Query Tool</ModalPageHeader>} size="l" hideCloseButton>
      <Group>
        <FormLayout>
          <FormItem top="Query">
            <Textarea autoFocus getRef={queryInput} rows={3} sizeY={SizeType.COMPACT} />
          </FormItem>
          <FormItem top="Result">
            <Textarea value={queryOutput} rows={3} sizeY={SizeType.COMPACT} status={formStatus} />
          </FormItem>
          <FormItem>
            <ButtonGroup>
              <Button mode="primary" onClick={clickOkHandler} loading={loading}>
                Exec
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
