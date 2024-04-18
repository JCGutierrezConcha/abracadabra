// Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor.

import { usuarios } from '../index.js'

export const validaMiddleware = (req, res, next) => {
    const usuario = req.params.usuario
    if (usuarios.find((item) => item.toLowerCase() == usuario)) {
        next()
    } else {
        return res.redirect('/assets/who.jpeg')
    }
}