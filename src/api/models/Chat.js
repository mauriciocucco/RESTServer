const Message = require('./Message')

class Chat {
    constructor() {
        this.messages = []
        this.users = {}
    }

    get lastTenMessages() {
        const messages = this.messages.slice(-10)

        return messages
    }

    get usersArray() {
        return Object.values(this.users)
    }

    sendMessage(uid, userName, message) {
        const newMessage = new Message(uid, userName, message)

        this.messages.push(newMessage)
    }

    connectUser(user) {
        this.users[user.id] = user
    }

    disconnectUser(id) {
        delete this.users[id]
    }
}

module.exports = Chat
