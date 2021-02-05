const generateMessage = (username, text, color) => {
    return {
        username,
        text,
        color,
        createdAt: new Date().getTime()
    }
};

module.exports = {
    generateMessage
}