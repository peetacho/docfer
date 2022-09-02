const { nanoid } = require("nanoid");

// generates a random ID
export const nano = () => {
    return nanoid().split("").map(char => char = char === "-" ? Math.random().toString(36)[2] : char).join('');
};

// assumes s is of type string
export const validateRoomCode = (s) => {
    let error
    if (s === undefined) {
        error = 'Room code is undefined'
    }
    else if (s === "") {
        error = 'Room code cannot be an empty string'
    }
    else if (s.includes(" ")) {
        error = 'Room code cannot contain spaces'
    }
    else if (s.length > 21) {
        error = 'Room code is too long'
    }
    else if (s.length < 5) {
        error = 'Room code is too short'
    }
    return error
};