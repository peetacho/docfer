import { Box } from '@chakra-ui/layout';
import React from 'react'
import EnterRoom from '../../components/EnterRoom/EnterRoom';

const EnterRoomPage = () => {
    return (
        <Box
            minHeight={'100vh'}>
            <EnterRoom />
        </Box>
    );
};

export default EnterRoomPage;