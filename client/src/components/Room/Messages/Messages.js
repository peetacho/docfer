import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import { FiPaperclip } from "react-icons/fi";
import { MESSAGE_TYPES } from "../../../constants/constants";


const downloadArrayBufferAsFile = (obj, mimType, fileName) => {
    let url = '';
    // convert the object into a url depending on whether obj is of type ArrayBuffer or File
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

const Messages = ({
    messages
}) => {
    const messageEndRef = useRef(null)

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);


    return (
        <Flex flexDirection={'column'} overflow={'auto'} flexGrow={1} >
            <Flex flexDirection={'column'} justifyContent={'end'}>
                {messages && messages.map((message, i) => {
                    return (
                        <Box key={i} alignSelf={message.sender === 'You' ? 'end' : 'start'} fontFamily={'Inter'} >
                            {
                                message.type === MESSAGE_TYPES.HEADER ? (
                                    <Text color={'primary.400'} fontWeight={400} fontSize={'17px'} lineHeight={'30px'}>{message.sender === 'You' ? 'You' : "User " + message.sender.substring(0, 5)}</Text>
                                ) : message.fileData ? (
                                    // message is a file
                                    <Flex
                                        cursor={'pointer'}
                                        mb={'12px'}
                                        px={'14px'}
                                        borderRadius={'10px'}
                                        height={'60px'}
                                        alignItems={'center'}
                                        bg={'sub.400'}
                                        color={'secondary.400'}
                                        gap={'7px'}
                                        onClick={() => downloadArrayBufferAsFile(message.fileData.file, message.fileData.fileType, message.fileData.fileName)}>
                                        <FiPaperclip />
                                        <Text fontWeight={300} fontSize={'20px'} lineHeight={'24px'}>{message.fileData.fileName}</Text>
                                    </Flex>
                                ) : (
                                    // message is a text message
                                    <Flex mb={'12px'} borderRadius={'10px'} height={'60px'} alignItems={'center'} bg={message.sender === 'You' ? 'brand.400' : 'white'}>
                                        <Text px={'14px'} color={message.sender === 'You' ? 'white' : 'secondary.400'} fontWeight={300} fontSize={'20px'} lineHeight={'24px'}>{message.msg}</Text>
                                    </Flex>
                                )
                            }
                        </Box>
                    )
                })}
                <div ref={messageEndRef} />
            </Flex>
        </Flex>
    )
}

export default Messages;