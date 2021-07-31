import { Box, Flex, Select } from '@chakra-ui/react';
import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather';
import IconButtonInternal from './components/IconButton';

interface Props {
    totalLogs: number;
    currentLog: number;
    onCurrentLogChange: (log: number) => void;
}

export function Pagination({
    totalLogs,
    currentLog,
    onCurrentLogChange,
}: Props) {
    return (
        <Flex>
            <IconButtonInternal
                Icon={ChevronLeft}
                onClick={() => {
                    if (currentLog > 0) {
                        onCurrentLogChange(currentLog - 1);
                    }
                }}
                isDisabled={currentLog === 0}
            />
            <Flex
                alignItems="center"
                color="gray"
                fontSize="13px"
                marginRight="10px"
            >
                <Select
                    value={currentLog + 1}
                    size="sm"
                    backgroundColor="#181920"
                    border="2px solid #363143"
                    borderColor="#363143"
                    color="#FFD47F"
                    width="60px"
                    marginRight="5px"
                    borderRadius="3px"
                    icon={
                        <ChevronDown
                            size={10}
                            strokeWidth="1px"
                            color="#424453"
                        />
                    }
                    _focus={{ outline: 'none' }}
                    _hover={{ borderColor: 'none' }}
                    onChange={e =>
                        onCurrentLogChange(Number(e.target.value) - 1)
                    }
                >
                    {new Array(totalLogs).fill(0).map((item, i) => {
                        return <option value={`${i + 1}`}>{i + 1}</option>;
                    })}
                </Select>
                <Box fontSize="14px"> of {totalLogs}</Box>
            </Flex>
            <IconButtonInternal
                Icon={ChevronRight}
                onClick={() => {
                    if (currentLog < totalLogs - 1) {
                        onCurrentLogChange(currentLog + 1);
                    }
                }}
                isDisabled={currentLog === totalLogs - 1}
            />
        </Flex>
    );
}
