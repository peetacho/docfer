import { SocketProvider } from '../../contexts/SocketProvider';
import Room from '../../components/Room/Room';

const RoomPage = () => {
    const app = (
        <SocketProvider>
            <Room />
        </SocketProvider>
    )

    return app
}

export default RoomPage;
