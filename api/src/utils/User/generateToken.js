const jwt = require('jsonwebtoken');

const tokenSign = async (user) => { //TODO: Genera Token
    return jwt.sign(
        {
            id: user.id, //TODO: <---
            admin: user.isAdmin
        }, //TODO: Payload ! Carga útil
        process.env.JWT_SECRET_KEY, //TODO ENV 
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}

module.exports= {
    tokenSign,
    verifyToken,
    decodeSign
}