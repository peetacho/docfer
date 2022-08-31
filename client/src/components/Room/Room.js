import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box, Button, Input, Stack, Text
} from '@chakra-ui/react'
import { useSocket } from "../../contexts/SocketProvider";
import { useParams } from "react-router-dom";

const Room = () => {
    const [messages, setMessages] = useState([])
    const inputRef = useRef(null);
    const { roomID } = useParams();
    const socket = useSocket();

    const addMessage = useCallback((msg, sender) => {
        setMessages([...messages, { msg: msg, sender: sender }])
    }, [messages])

    const receiveMessage = useCallback(({ msg, sender }) => {
        addMessage(msg, sender)
    }, [addMessage])


    useEffect(() => {
        if (socket === null) return
        socket.emit("join-room", roomID)
    }, [socket, roomID]);

    useEffect(() => {
        if (socket === null) return
        socket.on("receive-message", receiveMessage)
    }, [socket, receiveMessage]);

    return (
        <>
            <Input
                placeholder="send message here"
                ref={inputRef}
            />
            <Button onClick={e => {
                socket.emit("send-message", { msg: inputRef.current.value, room: roomID })
                addMessage(inputRef.current.value, "You")
            }}>
                Send msg
            </Button>
            <Stack>
                {messages && messages.map((message, i) => {
                    return (
                        <div key={i}>
                            <Box>
                                <Text>{message.msg} - {message.sender}</Text>
                            </Box>
                        </div>
                    )
                })}
            </Stack>

        </>
    )
}

export default Room;