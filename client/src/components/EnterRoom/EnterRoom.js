import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const EnterRoom = () => {
    const [id, setId] = useLocalStorage('id')
    return (
        <div>
            Enter Room
        </div>
    )
}

export default EnterRoom;