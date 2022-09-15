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

  const clickClear = () => {
    if (queryInput.current) {
      queryInput.current.value = '';
      queryInput.current.focus();
    }
    setQueryOutput('');
  };

  const clickOkHandler = () => {
    const queryString = queryInput.current?.value;
    if (queryString) {
      execDB(queryString)
        .then((result) => {
          return setQueryOutput(JSON.stringify(result));
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
            <Textarea value={queryOutput} rows={3} sizeY={SizeType.COMPACT} />
          </FormItem>
          <FormItem>
            <ButtonGroup>
              <Button mode="primary" onClick={clickOkHandler}>
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
