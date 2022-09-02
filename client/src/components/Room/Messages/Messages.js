import { Box, Button, Stack, Text } from "@chakra-ui/react"
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
    return (
        <Stack gap={'5px'} flexDirection={'column'}>
            {messages && messages.map((message, i) => {
                return (
                    <Box key={i} alignSelf={message.sender === 'You' ? 'end' : 'start'} fontFamily={'Inter'}>
                        {
                            message.type === MESSAGE_TYPES.HEADER ? (
                                <Text color={'primary.400'} fontWeight={400} fontSize={'17px'} lineHeight={'30px'}>{message.sender === 'You' ? 'You' : "User " + message.sender.substring(0, 5)}</Text>
                            ) : message.fileData ? (
                                // message is a file
                                <Box>
                                    <Button
                                        onClick={() => downloadArrayBufferAsFile(message.fileData.file, message.fileData.fileType, message.fileData.fileName)}>
                                        Download {message.fileData.fileName}
                                    </Button>
                                </Box>
                            ) : (
                                // message is a text message
                                <Box borderRadius={'10px'} height={'60px'} bg={'white'}>
                                    <Text px={'14'} py={'18.5'} color={'secondary.400'} fontWeight={300} fontSize={'20px'} lineHeight={'24px'}>{message.msg}</Text>
                                </Box>
                            )
                        }
                    </Box>
                )
            })}
        </Stack>
    )
}

export default Messages;