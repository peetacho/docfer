import {
    Text,
    Flex,
    useCheckbox,
    chakra
} from '@chakra-ui/react'
import { BsCheck } from 'react-icons/bs'

const CustomCheckbox = (props) => {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

    return (
        <chakra.label
            display='flex'
            flexDirection='row'
            alignItems='center'
            gridColumnGap={2}
            cursor='pointer'
            mt={'13px'}
            {...htmlProps}
        >
            <input {...getInputProps()} hidden />
            <Flex
                alignItems='center'
                justifyContent='center'
                borderRadius={'5px'}
                bg={'rgba(255, 255, 255, 0.1)'}
                border='1px solid'
                borderColor='rgba(255, 255, 255, 0.11)'
                w={'15px'}
                h={'15px'}
                {...getCheckboxProps()}
            >
                {state.isChecked && <BsCheck />}
            </Flex>
            <Text
                fontWeight={400}
                fontSize={'17px'}
                color={'white'}
                lineHeight={'30px'}
                {...getLabelProps()}>
                {props.text}
            </Text>
        </chakra.label>
    )
}

export default CustomCheckbox;