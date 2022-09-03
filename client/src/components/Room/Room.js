import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Flex, IconButton, Input
} from '@chakra-ui/react'
import { useSocket } from "../../contexts/SocketProvider";
import { useParams } from "react-router-dom";
import RoomNavBar from "./RoomNavBar/RoomNavBar";
import Messages from "./Messages/Messages";
import { MESSAGE_TYPES } from "../../constants/constants";
import { FiPaperclip, FiSend } from "react-icons/fi";

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
        if (e.key === 'Enter') {
            handleSendMessage()
            inputRef.current.value = ''
        }
    }

    return (
        <RoomNavBar roomID={roomID}>
            <Flex flexDirection={'column'} flexGrow={1}>
                <Messages messages={messages} />
                <Flex
                    gap={'25px'}
                    mt={'5px'}
                    mb={'40px'}
                    flexDirection={'row'}
                    height={'68px'}
                    color={'white'}>
                    <Input placeholder="type a message..." height={'inherit'} fontFamily={'Inter'} fontWeight={300} fontSize={'20px'} bg={'white'} borderRadius={'15px'} color={'secondary.400'} onKeyDown={handleOnKeyDown} ref={inputRef} />
                    <Input type="file" onChange={handleOnChangeFile} display={'none'} ref={hiddenFileInputRef} />
                    <Flex gap={'inherit'}>
                        <IconButton bg={'secondary.400'} height={'68px'} width={'68px'} isRound icon={<FiPaperclip size={'1.5rem'} />} onClick={handleUploadFile} />
                        <IconButton bg={'brand.400'} height={'68px'} width={'68px'} isRound icon={<FiSend size={'1.5rem'} />} onClick={handleSendMessage} />
                    </Flex>
                </Flex>
            </Flex>
        </RoomNavBar>
    )
}

export default Room;