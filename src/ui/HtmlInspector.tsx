import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { DOMInspector } from '@devtools-ds/dom-inspector';
import React from 'react';

interface Props {
    html: string;
}

export function HtmlInspector({ html }: Props) {
    const div = document.createElement('div');

    div.insertAdjacentHTML('beforeend', html);
    return (
        <Tabs align="end" variant="soft-rounded">
            <TabList>
                <Tab _focus={{ outline: 'none' }} fontSize="13px">
                    DOM
                </Tab>
                <Tab _focus={{ outline: 'none' }} fontSize="13px">
                    Preview
                </Tab>
            </TabList>
            <TabPanels textAlign="start">
                <TabPanel
                    backgroundColor="#EFF4F8"
                    borderRadius="5px"
                    marginTop="10px"
                >
                    <DOMInspector data={div} expandLevel={2} />
                </TabPanel>
                <TabPanel
                    backgroundColor="#EFF4F8"
                    borderRadius="5px"
                    marginTop="10px"
                >
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
