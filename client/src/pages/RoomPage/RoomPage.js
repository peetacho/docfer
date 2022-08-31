import { SocketProvider } from '../../contexts/SocketProvider';
import useLocalStorage from '../../hooks/useLocalStorage';
import Room from '../../components/Room/Room';

const RoomPage = () => {
    const [id, setId] = useLocalStorage('id')

    if (id === null) {
        window.location = '/enter-room'
    }

    const app = (
        <SocketProvider id={id}>
            <Room />
        </SocketProvider>
    )

    return app
}

export default RoomPage;
