import { Box, Flex, Icon, Text } from "@chakra-ui/react"

const BlueIconTextButton = ({
    icon,
    onClick,
    text
}) => {
    return (
        <Box
            as='button'
            w={'full'}
            borderRadius={'15px'}
            bg={'brand.400'}
            color={'white'}
            height={'68px'}
            onClick={() => onClick()}>
            <Flex flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={'27px'} px={'30px'}>
                <Icon w={'24px'} h={'24px'} as={icon} />
                <Text fontWeight={600} fontFamily={'Inter'} fontSize={'20px'}>{text}</Text>
            </Flex>
        </Box>
    )
}

export default BlueIconTextButton;