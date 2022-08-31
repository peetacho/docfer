import { SocketProvider } from '../contexts/SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [id, setId] = useLocalStorage('id')

  const app = (
    <SocketProvider id={id}>
      <div>
        inside app!
      </div>
    </SocketProvider>
  )

  return (
    id ? app : <button onClick={() => setId('settingid')}>click</button>
  )
}

export default App;
