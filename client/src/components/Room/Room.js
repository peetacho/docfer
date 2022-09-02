import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button, Flex, Input
} from '@chakra-ui/react'
import { useSocket } from "../../contexts/SocketProvider";
import { useParams } from "react-router-dom";
import RoomNavBar from "./RoomNavBar/RoomNavBar";
import Messages from "./Messages/Messages";
import { MESSAGE_TYPES } from "../../constants/constants";

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
            <Messages messages={messages} />
            <Flex
                pos={'fixed'}
                bottom={0}
                mb={'40px'}
                mr={'50px'}
                width={'-webkit-fill-available'}
                gap={'10px'}
                flexDirection={'row'}
                height={'68px'} >
                <Input placeholder="type a message..." onKeyDown={handleOnKeyDown} ref={inputRef} />
                <Input type="file" onChange={handleOnChangeFile} display={'none'} ref={hiddenFileInputRef} />
                <Button onClick={handleUploadFile}>Upload file</Button>
                <Button onClick={handleSendMessage}>Send msg</Button>
            </Flex>
        </RoomNavBar>
    )
}

export default Room;