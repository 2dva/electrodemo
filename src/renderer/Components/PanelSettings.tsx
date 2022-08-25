import {
  Button,
  Caption,
  CustomSelect,
  FormItem,
  Group,
  Panel,
  Text,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
// import { existsSync, readFile } from 'fs-extra';
// import path from 'path';
import { observer } from 'mobx-react';
import { IPanelProps, MODAL_PAGE_OPEN_DB } from '../constants';
import { modalStore } from '../modalStore';
import { dbStore } from '../dbStore';
// import {existsSync} from "fs";

export const PanelSettings = observer(({ id }: IPanelProps) => {
  const [mode, setMode] = React.useState('default');
  // const [disabled, setDisabled] = React.useState(false);
  const [fileContent, setFileContent] = useState('<empty>');

  useEffect(() => {
    // const fileName = '../README.md';
    // if (existsSync(fileName)) {
    //   readFile(fileName, 'utf-8', (err, data) => {
    //     if (err) {
    //       console.log(`An error ocurred reading the file :${err.message}`);
    //       return;
    //     }
    //     // app.getGPUInfo('basic')
    //     // Change how to handle the file content
    //     console.log(`The file content is : ${data}`);
    //     setFileContent(data);
    //   });
    // }
  }, []);

  return (
    <Panel id={id}>
      <Group>
        <FormItem top="mode">
          <CustomSelect
            value={mode}
            options={[
              {
                label: 'default',
                value: 'default',
              },
              {
                label: 'accent',
                value: 'accent',
              },
              {
                label: 'secondary',
                value: 'secondary',
              },
            ]}
            onChange={(event) => setMode(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <Button onClick={() => modalStore.openModal(MODAL_PAGE_OPEN_DB)}>
            Open Database
          </Button>
        </FormItem>
        <Caption>{dbStore.info.fileName}</Caption>
        <Text>{fileContent}</Text>
        <Text>{dbStore.info.systemInfo}</Text>
      </Group>
    </Panel>
  );
});
