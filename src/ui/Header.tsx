import { Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Trash, Copy } from 'react-feather';
import IconButtonInternal from './components/IconButton';
import logo from '../ui/assets/logo.png';

interface Props {
    onClearAll: () => void;
    onCopyArgs: () => void;
    showClearIcon: boolean;
}

export default function Header({
    onClearAll,
    onCopyArgs,
    showClearIcon,
}: Props) {
    return (
        <Flex
            padding="15px"
            justifyContent="space-between"
            backgroundColor="#1A1C22"
        >
            <Flex fontSize="18px" alignItems="center" color="#EFF4F8">
                <img
                    src={logo}
                    style={{ height: '30px', marginLeft: '-10px' }}
                />
            </Flex>
            <Flex alignItems="center">
                {showClearIcon && (
                    <IconButtonInternal
                        onClick={onClearAll}
                        Icon={Trash}
                        tooltip="Clear all logs"
                    />
                )}
                <IconButtonInternal
                    onClick={onCopyArgs}
                    Icon={Copy}
                    tooltip="Copy Jest args"
                />
            </Flex>
        </Flex>
    );
}
