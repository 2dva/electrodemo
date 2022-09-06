import {
  CustomSelect,
  FormItem,
  FormLayoutGroup,
  Group,
  Input,
  Panel,
  SegmentedControl,
  SimpleCell,
  SizeType,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { IPanelProps, recTypeOptions } from '../constants';

export const PanelDemo = observer(({ id }: IPanelProps) => {
  const visibleRowCountOptions = [
    { label: 'All', value: 'all' },
    { label: '250', value: '250' },
    { label: '100', value: '100' },
    { label: '25', value: '25' },
  ];
  const defaultVisibleRowCount = '25';
  const [rowCount, setRowCount] = useState(defaultVisibleRowCount);

  return (
    <Panel id={id}>
      <Group>
        <SimpleCell>DEMO CELL</SimpleCell>
        <FormLayoutGroup mode="horizontal">
          <FormItem bottom={`Show ${rowCount} rows`}>
            <SegmentedControl
              style={{ width: '250px', height: '30px' }}
              size="m"
              name="rowCount"
              value={rowCount}
              onChange={(val) => setRowCount(val as string)}
              options={visibleRowCountOptions}
            />
          </FormItem>
          <FormItem top="Type">
            <CustomSelect
              options={recTypeOptions}
              style={{ width: '250px', height: '40px' }}
              dropdownOffsetDistance={5}
              mode="plain"
            />
          </FormItem>
        </FormLayoutGroup>
        <FormItem top="Type">
          <Input
            type="text"
            defaultValue="Lorem ipsum dolor sit amet"
            sizeY={SizeType.COMPACT}
            style={{ width: '250px', height: '30px' }}
          />
        </FormItem>
      </Group>
    </Panel>
  );
});
