import { Flex, Text } from "@chakra-ui/react";

const MessageComponent = ({
    bg,
    color,
    text,
    ...otherProps
}) => {
    return (
        <Flex
            mb={'12px'}
            px={{ base: '12px', md: '14px' }}
            py={{ base: '9.5px', md: '18.5px' }}
            borderRadius={'15px'}
            alignItems={'center'}
            bg={bg}
            color={color}
            gap={'10px'}
            {...otherProps}>
            {otherProps.children}
            <Text fontWeight={300}>{text}</Text>
        </Flex>
    )
}

export default MessageComponent;