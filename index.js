import express from 'express'
import path from 'path'
import { validaMiddleware } from './middlewares/valida.middleware.js'

const app = express()

const __dirname = import.meta.dirname;

// Middleware ruta pública
app.use(express.static(path.join(__dirname, '/public')))

// Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
export const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"]

app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios: usuarios })
})

// Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.

app.get('/abracadabra/juego/:usuario', validaMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/juego.html'))
})

// Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    const numeroUsuario = +req.params.n
    if (numeroAleatorio == numeroUsuario) {
        return res.redirect('/assets/conejito.jpg')
    } else {
        return res.redirect('/assets/voldemort.jpg');
    }
})

// Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.

app.use('*', (req, res) => {
    res.send("Esta página no existe...")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})