import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box, Button, Input, Stack, Text
} from '@chakra-ui/react'
import { useSocket } from "../../contexts/SocketProvider";
import { useParams } from "react-router-dom";

const downloadArrayBufferAsFile = (obj, mimType, fileName) => {
    let url = '';
    // conver the object into a url depending on whether obj is of type ArrayBuffer or File
    if (Object.prototype.toString.call(obj) === '[object ArrayBuffer]') {
        let binary = '';
        const bytes = new Uint8Array(obj);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const file = window.btoa(binary);
        url = `data:${mimType};base64,` + file;
    }
    else if (Object.prototype.toString.call(obj) === '[object File]') {
        url = URL.createObjectURL(obj)
    }
    else {
        return;
    }

    // download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

const Room = () => {
    const [messages, setMessages] = useState([])
    const [fileData, setFileData] = useState(null)
    const inputRef = useRef(null);
    const { roomID } = useParams();
    const socket = useSocket();

    const addMessage = useCallback((msg, sender, fileData) => {
        setMessages([...messages, { msg: msg, sender: sender, fileData: fileData }])
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

    return (
        <>
            <Input
                placeholder="send message here"
                ref={inputRef}
            />
            <Button onClick={e => {
                socket.emit("send-message", { msg: inputRef.current.value, room: roomID, fileData: null })
                addMessage(inputRef.current.value, "You")
            }}>
                Send msg
            </Button>
            <Input type="file" onChange={e => {
                let targetFile = e.target.files[0]
                if (targetFile) {
                    setFileData({ file: targetFile, fileType: targetFile.type, fileName: targetFile.name });
                }
            }} />
            <Button onClick={e => {
                socket.emit("send-message", { msg: "", room: roomID, fileData: fileData })
                addMessage("", "You", fileData)
            }}>
                Upload file
            </Button>
            <Stack>
                {messages && messages.map((message, i) => {
                    return (
                        <div key={i}>
                            {
                                message.fileData ? (
                                    <Box>
                                        <Text>{message.fileData.fileName} - {message.sender}</Text>
                                        <Button
                                            onClick={() => downloadArrayBufferAsFile(message.fileData.file, message.fileData.fileType, message.fileData.fileName)}>
                                            Download this file
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Text>{message.msg} - {message.sender}</Text>
                                    </Box>
                                )
                            }
                        </div>
                    )
                })}
            </Stack>
        </>
    )
}

export default Room;