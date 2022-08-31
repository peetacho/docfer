// assumes s is of type string
export const validateRoomCode = (s) => {
    return s !== undefined && s !== "" && !s.includes(" ")
};