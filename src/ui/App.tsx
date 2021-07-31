import {
    ChakraProvider,
    Flex,
    GlobalStyle,
    theme as defaultTheme,
} from '@chakra-ui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@devtools-ds/themes';
import copy from 'copy-to-clipboard';
import Header from './Header';
import InitialScreen from './InitialScreen';
import { HtmlInspector } from './HtmlInspector';

const theme = {
    ...defaultTheme,
    styles: {
        global: {
            'html, body': {
                padding: '0px',
            },
        },
    },
};

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

function App() {
    const [logs, setLogs] = useState<{ id: string; content: string }[]>([]);
    const [args, setArgs] = useState('');
    const [selectedLogIndex, setSelectedLogIndex] = useState<null | number>(
        null
    );

    async function clearAll() {
        await fetch(`${API_URL}/clear`);
        setLogs([]);
        setSelectedLogIndex(null);
    }

    function copyArgs() {
        copy(args);
    }

    const selectedLog =
        selectedLogIndex !== null ? logs[selectedLogIndex] : null;

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(`${API_URL}/document`)
                .then(r => r.json())
                .then(res => {
                    setLogs(res.logs);
                    console.log('DAta', selectedLogIndex);
                    if (res.logs.length > 0 && selectedLogIndex === null) {
                        setSelectedLogIndex(res.logs.length - 1);
                    }
                });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [selectedLogIndex]);

    useEffect(() => {
        fetch(`${API_URL}/getArgs`)
            .then(r => r.json())
            .then(res => setArgs(res.args));
    }, []);

    return (
        <ThemeProvider theme={'chrome'} colorScheme={'dark'}>
            <ChakraProvider theme={theme}>
                <GlobalStyle />
                <Flex flexDir="column" height="100vh" backgroundColor="#23232C">
                    <Header
                        onClearAll={clearAll}
                        onCopyArgs={copyArgs}
                        showClearIcon={logs.length > 0}
                    />
                    {selectedLog === null ? (
                        <InitialScreen args={args} />
                    ) : (
                        <HtmlInspector
                            html={selectedLog && selectedLog.content}
                            id={selectedLog && selectedLog.id}
                            currentLog={selectedLogIndex || 0}
                            totalLogs={logs.length}
                            onCurrentLogChange={index => {
                                setSelectedLogIndex(index);
                            }}
                        />
                    )}
                </Flex>
            </ChakraProvider>
        </ThemeProvider>
    );
}

export default App;
