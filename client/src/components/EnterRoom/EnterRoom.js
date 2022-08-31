import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Flex
} from '@chakra-ui/react'
import bgImage from '../../assets/images/enter-room-bg.jpeg'
import { validateRoomCode } from "../../utils/utils";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import useLocalStorage from "../../hooks/useLocalStorage";
import EnterRoomInput from "./EnterRoomInput/EnterRoomInput";


const EnterRoom = () => {

    const [localRoomCode, setLocalRoomCode] = useLocalStorage('room-code')
    const [checkBoxValue, setCheckBoxValue] = useState(false);

    const handleSubmit = (code) => {
        if (checkBoxValue) {
            setLocalRoomCode(code)
        }
        window.location = '/room/' + code
    }

    useEffect(() => {
        if (localRoomCode !== null) {
            // move to room code in local storage
            window.location = '/room/' + localRoomCode
        }
    }, [localRoomCode]);

    return (
        <>
            <Box
                position={'fixed'}
                height={'100%'}
                width={'100%'}
                zIndex={-1}
                backgroundImage={`url(${bgImage})`}
                backgroundSize={'cover'}>
            </Box>
            <Flex
                minHeight={'inherit'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'20px'}>
                <Flex
                    width={'xl'}
                    flexDirection={'column'}
                    color={'white'}>
                    <Text
                        alignSelf={'center'}
                        fontFamily={'Lexend'}
                        fontWeight={500}
                        fontSize={{ base: '25px', md: '45px' }}
                        lineHeight={{ base: '52px', md: '81px' }}>
                        Create/Join a room
                    </Text>
                    <EnterRoomInput validateRoomCode={validateRoomCode} handleSubmit={handleSubmit} setLocalRoomCode={setLocalRoomCode} />
                    <CustomCheckbox
                        text={'Remember this room'}
                        onChange={e => setCheckBoxValue(e.target.checked)} />
                </Flex>
            </Flex>
        </>
    )
}

export default EnterRoom;