import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
    Box,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Flex
} from '@chakra-ui/react'
import bgImage from '../../assets/images/enter-room-bg.jpeg'
import { FaRandom } from 'react-icons/fa'
import { validateRoomCode } from "../../utils/utils";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const EnterRoom = () => {
    const [id, setId] = useLocalStorage('id')
    return (
        <>
            <Box
                position={'fixed'}
                height={'100%'}
                zIndex={-1}>
                <img src={bgImage} alt="im" />
            </Box>
            <Flex
                minHeight={'inherit'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Flex
                    width={'xl'}
                    flexDirection={'column'}
                    color={'white'}>
                    <Text
                        alignSelf={'center'}
                        fontFamily={'Lexend'}
                        fontWeight={500}
                        fontSize={'45px'}
                        lineHeight={'81px'}>
                        Create/Join a room
                    </Text>
                    <InputGroup width='100%'>
                        <Input
                            borderRadius={'10px'}
                            placeholder='Enter any room code'
                            background={'rgba(255, 255, 255, 0.1)'}
                            border={'1px solid'}
                            borderColor={'rgba(255, 255, 255, 0.11)'}
                            height={'58px'}
                            px={'20px'}
                            py={'18px'}
                            color={'white'}
                            _placeholder={{ color: 'white', fontFamily: 'Lexend', fontSize: '18px', lineHeight: '22.5px', fontWeight: 500 }}
                            _hover={{ borderColor: 0 }}
                            _focus={{ border: '1px solid rgba(255, 255, 255, 0.4)' }}
                            _focusVisible={{ borderColor: 'initial', boxShadow: 'none' }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    if (validateRoomCode(e.target.value)) {
                                        console.log("enter pressed!", e.target.value)
                                        window.location = '/room/' + e.target.value
                                    }
                                }
                            }}
                        />
                        <InputRightElement h={'full'}>
                            <IconButton
                                aria-label='randomize'
                                icon={<FaRandom size={'1.2rem'} />}
                                variant={'ghost'}
                                pr={'4px'}
                                _hover={{ bg: 'none' }}
                                _active={{ bg: 'none', color: 'rgba(255, 255, 255, 0.7)' }} />
                        </InputRightElement>
                    </InputGroup>
                    <CustomCheckbox text={'Remember this room'} />
                </Flex>
            </Flex>
        </>
    )
}

export default EnterRoom;