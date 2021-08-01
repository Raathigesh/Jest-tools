import {
    Flex,
    Link,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { DOMInspector } from '@devtools-ds/dom-inspector';
import React from 'react';
import { Code, Layout, Link2 } from 'react-feather';
import { Pagination } from './Pagination';

interface Props {
    html: string;
    id: string;
    totalLogs: number;
    currentLog: number;
    onCurrentLogChange: (log: number) => void;
}

const port = (window as any).port || '4545';

export function HtmlInspector({
    html,
    id,
    totalLogs,
    currentLog,
    onCurrentLogChange,
}: Props) {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', html);

    return (
        <Flex flexGrow={1} flexDir="column" margin="15px">
            <Tabs variant="soft-rounded">
                <TabList>
                    <Tab
                        _focus={{ outline: 'none' }}
                        fontSize="13px"
                        borderRadius="3px"
                        _selected={{
                            backgroundColor: '#FFD47F',
                            color: '#292A33',
                        }}
                        color="white"
                        padding="10px"
                        height="30px"
                    >
                        <Flex alignItems="center">
                            <Code size="15px" style={{ marginRight: '5px' }} />{' '}
                            DOM
                        </Flex>
                    </Tab>
                    <Tab
                        _focus={{ outline: 'none' }}
                        fontSize="13px"
                        borderRadius="3px"
                        _selected={{
                            backgroundColor: '#FFD47F',
                            color: '#292A33',
                        }}
                        color="white"
                        padding="10px"
                        height="30px"
                    >
                        <Flex alignItems="center">
                            <Layout
                                size="15px"
                                style={{ marginRight: '5px' }}
                            />{' '}
                            Preview
                        </Flex>
                    </Tab>
                </TabList>
                <TabPanels textAlign="start">
                    <TabPanel
                        borderRadius="4px"
                        marginTop="10px"
                        height="calc(100vh - 200px)"
                        overflow="auto"
                        backgroundColor="#292A33"
                    >
                        {Array.from(div.children).map((child, i) => (
                            <DOMInspector
                                key={i}
                                data={child}
                                expandLevel={2}
                            />
                        ))}
                    </TabPanel>
                    <TabPanel
                        borderRadius="5px"
                        marginTop="10px"
                        height="calc(100vh - 200px)"
                        backgroundColor="white"
                    >
                        <iframe
                            style={{ height: '100%', width: '100%' }}
                            src={`http://localhost:${port}/preview/${id}`}
                        ></iframe>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Flex
                alignItems="center"
                marginTop="10px"
                justifyContent="flex-end"
            >
                <Link
                    href={`http://localhost:${port}/preview/${id}`}
                    isExternal
                    marginRight="15px"
                    color="white"
                >
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        fontSize="14px"
                        color="#89B887"
                    >
                        <Link2 size="15px" />
                        <Flex marginLeft="5px">Preview in browser</Flex>
                    </Flex>
                </Link>
                <Pagination
                    totalLogs={totalLogs}
                    currentLog={currentLog}
                    onCurrentLogChange={onCurrentLogChange}
                />
            </Flex>
        </Flex>
    );
}
