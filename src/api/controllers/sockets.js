const { verifyToken } = require('../helpers')
const { Chat } = require('../models')

const chat = new Chat()

const socketController = async (socket, io) => {
    const verifiedUser = await verifyToken(
        socket.handshake.headers.authorization
    )

    if (!verifiedUser) {
        console.error('No se pudo verificar el token')
        return socket.disconnect()
    }

    chat.connectUser(verifiedUser)

    io.emit('active-users', chat.usersArray)

    socket.emit('public-messages', chat.lastTenMessages)

    // lo conecto a una sala especial
    socket.join(verifiedUser.id) // todos van a tener 3 salas: global, por socket.id y por verifiedUser.id

    socket.on('disconnect', () => {
        chat.disconnectUser(verifiedUser.id)

        io.emit('active-users', chat.usersArray)
    })

    socket.on('send-message', ({ uid, message }) => {
        if (uid) {
            socket.to(uid).emit('private-message', {
                from: verifiedUser.name,
                message,
            })
        } else {
            chat.sendMessage(verifiedUser.id, verifiedUser.name, message)

            io.emit('public-messages', chat.lastTenMessages)
        }
    })

    return undefined
}

module.exports = {
    socketController,
}
