import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import { FiPaperclip } from "react-icons/fi";
import { MESSAGE_TYPES } from "../../../constants/constants";
import MessageComponent from "../../MessageComponent/MessageComponent";


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
        <Flex flexDirection={'column'} overflow={'overlay'} flexGrow={1} px={{ base: '20px', md: '24px' }} >
            <Flex flexDirection={'column'} justifyContent={'end'}>
                {messages && messages.map((message, i) => {
                    return (
                        <Box key={i} alignSelf={message.sender === 'You' ? 'end' : 'start'} fontFamily={'Inter'} fontSize={{ base: '16px', md: '20px' }} lineHeight={'24px'}>
                            {
                                message.type === MESSAGE_TYPES.HEADER ? (
                                    <Text color={'primary.400'} fontWeight={400} fontSize={{ base: '14px', md: '17px' }} lineHeight={'30px'}>{message.sender === 'You' ? 'You' : "User " + message.sender.substring(0, 5)}</Text>
                                ) : message.fileData ? (
                                    // message is a file
                                    <MessageComponent
                                        cursor={'pointer'}
                                        gap={'10px'}
                                        bg={'sub.400'}
                                        color={'secondary.400'}
                                        text={message.fileData.fileName}
                                        _hover={{ opacity: 0.7 }}
                                        onClick={() => downloadArrayBufferAsFile(message.fileData.file, message.fileData.fileType, message.fileData.fileName)}>
                                        <FiPaperclip />
                                    </MessageComponent>
                                ) : (
                                    // message is a text message
                                    <MessageComponent
                                        borderRadius={'15px'}
                                        bg={message.sender === 'You' ? 'brand.400' : 'white'}
                                        color={message.sender === 'You' ? 'white' : 'secondary.400'}
                                        text={message.msg} />
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