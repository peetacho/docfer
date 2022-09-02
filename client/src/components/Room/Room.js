import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button, Input
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
        socket.emit("send-message", { msg: "", room: roomID, fileData: fileData })
        addMessage("", "You", fileData)
    }

    const handleSendMessage = (e) => {
        socket.emit("send-message", { msg: inputRef.current.value, room: roomID, fileData: null })
        addMessage(inputRef.current.value, "You", null)
    }

    return (
        <RoomNavBar roomID={roomID}>
            <Input
                placeholder="send message here"
                ref={inputRef}
            />
            <Button onClick={handleSendMessage}>Send msg</Button>
            <Input type="file" onChange={handleOnChangeFile} />
            <Button onClick={handleUploadFile}>Upload file</Button>
            <Button onClick={() => console.log(messages)}>print state bruh</Button>
            <Messages messages={messages} />
        </RoomNavBar>
    )
}

export default Room;