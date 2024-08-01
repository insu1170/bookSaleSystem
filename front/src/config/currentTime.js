function currentTime() {
    const date = new Date();
    const getDate = (data) => {
        return ('0' + (data)).slice(-2)
    }
    return `${date.getFullYear()}-${getDate(date.getMonth() + 1)}-${getDate(date.getDate())} ${getDate(date.getHours())}:${getDate(date.getMinutes())}:${getDate(date.getSeconds())}`

}

export default currentTime;