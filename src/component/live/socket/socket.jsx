import { useEffect, useState } from 'react'
import { useSocket } from '../../../context/socket'

export default function Socket() {

    const [connect, setConnect] = useState(false)
    const [socket] = useSocket()

    useEffect(()=>{
        if (connect) {
            socket.connect()
        } else {
            if (socket) socket.disconnect()
        }
    }, [socket, connect])

    return (
        <>
            <button onClick={() => setConnect(!connect)}>
                { connect ? 'Stop LIVE' : 'Start LIVE' }
            </button>
        </>
    )
}