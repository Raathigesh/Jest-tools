import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Trash, Copy } from 'react-feather';

interface Props {
    onClearAll: () => void;
}

export default function Header({ onClearAll }: Props) {
    return (
        <Flex
            padding="10px"
            justifyContent="space-between"
            backgroundColor="#FCFCFC"
            boxShadow="1px 1px 2px #d4d4d4"
        >
            <Flex fontSize="18px" alignItems="center">
                Jest tools
            </Flex>
            <Flex>
                <Tooltip label="Clear all logs">
                    <IconButton
                        onClick={onClearAll}
                        aria-label="Clear all"
                        icon={<Trash size={12} />}
                        size="sm"
                        marginRight="10px"
                    />
                </Tooltip>
                <Tooltip label="Copy Jest args">
                    <IconButton
                        aria-label="Copy Jest args"
                        icon={<Copy size={12} />}
                        size="sm"
                    />
                </Tooltip>
            </Flex>
        </Flex>
    );
}
