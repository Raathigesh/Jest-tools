import { Flex, Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const Code = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            as="span"
            backgroundColor="#424453"
            borderRadius="3px"
            marginBottom="10px"
            marginTop="10px"
            fontSize="14px"
            padding="10px"
            color="#FFFFFD"
            wordBreak="break-all"
            fontWeight={600}
        >
            {children}
        </Box>
    );
};

interface Props {
    args: string;
}
export default function InitialScreen({ args }: Props) {
    return (
        <Flex
            alignSelf="center"
            backgroundColor="#1A1C22"
            boxShadow="3px 3px 2px #1E2228"
            padding="15px"
            borderRadius="5px"
            marginTop="50px"
            color="white"
            flexDir="column"
        >
            <Flex fontSize="18px" fontWeight={600}>
                Starting Jest
            </Flex>
            <Flex flexDir="column" width="500px">
                <Flex>Append the following args when you start Jest</Flex>
                <Code>{args}</Code>
                For example if you normally start Jest with the following
                command:
                <Code>yarn test</Code>
                Now you have to append an additional argument as below.
                <Code>yarn test {args}</Code>
            </Flex>
            <Flex fontSize="18px" marginTop="20px" fontWeight={600}>
                Inspecting html
            </Flex>
            <Flex flexDir="column" width="500px">
                <Flex>
                    Console.log() any html string and it will appear in Jest
                    tools inspector.
                </Flex>
                <Code>{`console.log(document.body.innerHTML)`}</Code>
            </Flex>
        </Flex>
    );
}
