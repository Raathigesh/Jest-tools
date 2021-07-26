import {
    ChakraProvider,
    Flex,
    GlobalStyle,
    theme as defaultTheme,
} from '@chakra-ui/react';

import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from './Header';
import InitialScreen from './InitialScreen';
import { LogsPanel } from './LogsPanel';

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

function App() {
    const [logs, setLogs] = useState<{ id: string; content: string }[]>([]);
    const [args, setArgs] = useState('');

    async function clearAll() {
        await fetch('http://localhost:4545/clear');
        setLogs([]);
    }

    useEffect(() => {
        setInterval(() => {
            fetch('http://localhost:4545/document')
                .then(r => r.json())
                .then(res => setLogs(res.logs));
        }, 2000);

        fetch('http://localhost:4545/getArgs')
            .then(r => r.json())
            .then(res => setArgs(res.args));
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <GlobalStyle />
            <Flex flexDir="column" backgroundColor="#F2F2F2" height="100vh">
                <Header onClearAll={clearAll} />
                {logs.length === 0 ? (
                    <InitialScreen args={args} />
                ) : (
                    <LogsPanel logs={logs} />
                )}
            </Flex>
        </ChakraProvider>
    );
}

export default App;
