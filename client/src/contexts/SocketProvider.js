import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_DOCFER_SERVER_LINK)
        setSocket(newSocket)
        return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}