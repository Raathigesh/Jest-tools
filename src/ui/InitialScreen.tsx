import { Flex, Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const Code = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            as="span"
            backgroundColor="#f9f0de"
            borderRadius="3px"
            marginBottom="10px"
            marginTop="10px"
            fontSize="14px"
            padding="10px"
            color="#252525"
            wordBreak="break-all"
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
            backgroundColor="#FCFCFC"
            boxShadow="1px 1px 2px #d4d4d4"
            padding="15px"
            borderRadius="5px"
            marginTop="50px"
        >
            <Flex flexDir="column" width="500px">
                <Flex>Append the following args when you start Jest</Flex>
                <Code>{args}</Code>
                If you normally start Jest with the following command:
                <Code>yarn test</Code>
                Now you have to append an additional argument:
                <Code>yarn test {args}</Code>
            </Flex>
        </Flex>
    );
}
