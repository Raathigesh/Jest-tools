import React from 'react';
import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Flex,
} from '@chakra-ui/react';
import { HtmlInspector } from './HtmlInspector';

interface Props {
    logs: {
        id: string;
        content: string;
    }[];
}
export function LogsPanel({ logs }: Props) {
    return (
        <Tabs isManual variant="soft-rounded" orientation="vertical">
            <TabList margin="10px">
                {logs.map((log, i) => {
                    return (
                        <Tab
                            _focus={{ outline: 'none' }}
                            fontSize="14px"
                            padding="15px"
                            height="15px"
                        >
                            {i + 1}
                        </Tab>
                    );
                })}
            </TabList>
            <TabPanels
                margin="10px"
                borderRadius="5px"
                backgroundColor="#FCFCFC"
                boxShadow="1px 1px 2px #d4d4d4"
            >
                {logs.map((log, i) => {
                    return (
                        <TabPanel>
                            <HtmlInspector html={log.content} />
                        </TabPanel>
                    );
                })}
            </TabPanels>
        </Tabs>
    );
}
