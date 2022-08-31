import React, { useState } from "react";
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

const handleSubmit = (code) => {
    console.log("enter pressed!", code)
    window.location = '/room/' + code
}

const EnterRoom = () => {

    const [localRoomCode, setLocalRoomCode] = useLocalStorage('room-code')
    const [inputRoomCode, setInputRoomCode] = useState('');

    if (localRoomCode !== null) {
        // move to room code in local storage
        handleSubmit(localRoomCode)
    }

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
                    <EnterRoomInput validateRoomCode={validateRoomCode} handleSubmit={handleSubmit} setInputRoomCode={setInputRoomCode} />
                    <CustomCheckbox
                        text={'Remember this room'}
                        onChange={e => console.log("checkbox clicked! ", e.target.checked)} />
                </Flex>
            </Flex>
        </>
    )
}

export default EnterRoom;