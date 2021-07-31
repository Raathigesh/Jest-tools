import { IconButton, Tooltip } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
    onClick: () => void;
    Icon: any;
    isDisabled?: boolean;
    tooltip?: string;
}

export default function IconButtonInternal({
    Icon,
    onClick,
    isDisabled,
    tooltip,
}: Props) {
    const content = (
        <IconButton
            onClick={onClick}
            aria-label="Clear all"
            icon={<Icon size={12} color="#424453" />}
            size="sm"
            marginRight="10px"
            backgroundColor="#181920"
            border="2px solid #424453"
            borderColor="#363143"
            _focus={{ outline: 'none' }}
            _hover={{ bg: '#FFD47F' }}
            isDisabled={isDisabled}
        />
    );

    if (tooltip) {
        return <Tooltip label={tooltip}>{content}</Tooltip>;
    }

    return content;
}
