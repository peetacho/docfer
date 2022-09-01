import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Box, Button, Input, Stack, Text
} from '@chakra-ui/react'
import { useSocket } from "../../contexts/SocketProvider";
import { useParams } from "react-router-dom";

const downloadArrayBufferAsFile = (arrayBuffer, mimType, fileName) => {
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const file = window.btoa(binary);
    const url = `data:${mimType};base64,` + file;

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
    const [receivedFileData, setReceivedFileData] = useState(null)
    const inputRef = useRef(null);
    const { roomID } = useParams();
    const socket = useSocket();

    const addMessage = useCallback((msg, sender) => {
        setMessages([...messages, { msg: msg, sender: sender }])
    }, [messages])

    const receiveMessage = useCallback(({ msg, sender, fileData }) => {
        addMessage(msg, sender)
        setReceivedFileData(fileData)
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
                socket.emit("send-message", { msg: inputRef.current.value, room: roomID, fileData: fileData })
                addMessage(inputRef.current.value, "You")
            }}>
                Send msg
            </Button>
            <Input type="file" onChange={e => {
                let targetFile = e.target.files[0]
                if (targetFile) {
                    setFileData({ file: targetFile, fileType: targetFile.type, fileName: targetFile.name });
                }
                // console.log(e.target.files[0])
            }} />
            {
                receivedFileData ? (
                    // <Image src={URL.createObjectURL(new Blob([fileArrayBuffer]))} />
                    <Button onClick={() => downloadArrayBufferAsFile(receivedFileData.file, receivedFileData.fileType, receivedFileData.fileName)}></Button>
                ) : null
            }
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