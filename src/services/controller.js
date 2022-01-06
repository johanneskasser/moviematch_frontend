module.exports = {
    checkDuplicate(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if(list[i].username === obj.username) {
                return true
            }
        }
        return false
    },
    toErase(reqF, requestedF, list) {
        for (let i = 0; i < list.length; i++) {
            if(list[i].requestedFriend === requestedF && list[i].requestingFriend === reqF) {
                return i;
            }
        }
    }
}

