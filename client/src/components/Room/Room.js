import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Flex, Input, chakra, Icon
} from '@chakra-ui/react'
import { useSocket } from "../../contexts/SocketProvider";
import { useParams } from "react-router-dom";
import RoomNavBar from "./RoomNavBar/RoomNavBar";
import Messages from "./Messages/Messages";
import { MESSAGE_TYPES } from "../../constants/constants";
import { FiPaperclip, FiSend } from "react-icons/fi";
import StyledIconButton from "../CustomButtons/StyledIconButton/StyledIconButton";

const Room = () => {
    const [messages, setMessages] = useState([])
    const [fileData, setFileData] = useState(null)
    const inputRef = useRef(null);
    const hiddenFileInputRef = useRef(null);
    const { roomID } = useParams();
    const socket = useSocket();

    const addMessage = useCallback((msg, sender, fileData) => {
        const messagesToAdd = []
        if (messages.length === 0 || messages.at(-1).sender !== sender) {
            messagesToAdd.push({ type: MESSAGE_TYPES.HEADER, sender: sender })
        }
        messagesToAdd.push({ type: MESSAGE_TYPES.OTHER, msg: msg, sender: sender, fileData: fileData })
        setMessages([...messages, ...messagesToAdd])
    }, [messages])

    const receiveMessage = useCallback(({ msg, sender, fileData }) => {
        addMessage(msg, sender, fileData)
    }, [addMessage])

    useEffect(() => {
        if (socket === null) return
        socket.emit("join-room", roomID)
    }, [socket, roomID]);

    useEffect(() => {
        if (socket === null) return
        socket.on("receive-message", receiveMessage)
    }, [socket, receiveMessage]);

    const handleOnChangeFile = (e) => {
        let targetFile = e.target.files[0]
        if (targetFile) setFileData({ file: targetFile, fileType: targetFile.type, fileName: targetFile.name });
    }

    const handleUploadFile = () => {
        hiddenFileInputRef.current.click()
    }

    const handleSendMessage = (e) => {
        if (fileData) {
            socket.emit("send-message", { msg: "", room: roomID, fileData: fileData })
            addMessage("", "You", fileData)
            setFileData(null)
        } else {
            socket.emit("send-message", { msg: inputRef.current.value, room: roomID, fileData: null })
            addMessage(inputRef.current.value, "You", null)
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter' && inputRef.current.value !== '') {
            handleSendMessage()
            inputRef.current.value = ''
        }
    }

    return (
        <RoomNavBar roomID={roomID}>
            <Flex flexDirection={'column'} flexGrow={1}>
                <Messages messages={messages} />
                <Flex
                    px={{ base: '20px', md: '24px' }}
                    gap={{ base: '12px', md: '25px' }}
                    mt={'10px'}
                    mb={{ base: '30px', md: '40px' }}
                    flexDirection={'row'}
                    height={{ base: '42px', md: '68px' }}
                    color={'white'}>
                    <Input placeholder="type a message..." height={'inherit'} fontFamily={'Inter'} fontWeight={300} fontSize={{ base: '14px', md: '20px' }} bg={'white'} borderRadius={{ base: '10px', md: '15px' }} color={'secondary.400'} onKeyDown={handleOnKeyDown} ref={inputRef} />
                    <Input type="file" onChange={handleOnChangeFile} display={'none'} ref={hiddenFileInputRef} />
                    <Flex gap={'inherit'}>
                        <StyledIconButton bg={'secondary.400'} hw={{ base: '42px', md: '68px' }} icon={
                            <>
                                <Icon as={FiPaperclip} boxSize={{ base: '16px', md: '26px' }} />
                                {
                                    fileData ? (
                                        <chakra.span
                                            pos="absolute"
                                            top="-1px"
                                            right="-1px"
                                            p={{ base: '4px', md: '8px' }}
                                            fontSize="xs"
                                            fontWeight="bold"
                                            lineHeight="none"
                                            color="red.100"
                                            transform="translate(50%,-50%)"
                                            bg="red.600"
                                            rounded="full"
                                        />
                                    ) : null
                                }
                            </>
                        } onClick={handleUploadFile} />
                        <StyledIconButton bg={'brand.400'} hw={{ base: '42px', md: '68px' }} icon={<Icon as={FiSend} boxSize={{ base: '16px', md: '26px' }} />} onClick={handleSendMessage} />
                    </Flex>
                </Flex>
            </Flex>
        </RoomNavBar>
    )
}

export default Room;