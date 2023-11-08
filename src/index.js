const express = require('express')
const bodyParser = require('body-parser')
require('custom-env').env()
const app = express()
const db = require('./util/db')
const Cliente = require('./cliente/cliente.model')
const clienteRoutes = require('./cliente/cliente.routes')
const veiculoRoutes = require('./veiculo/veiculo.routes')
const locacaoRoutes = require('./locacao/locacao.routes')
const port = 3000

const baseUrl = '/api'

app.use(bodyParser.json())

app.get(baseUrl, (req, res) => {
    res.send('API is OK')
})

clienteRoutes(app, baseUrl)
veiculoRoutes(app, baseUrl)
locacaoRoutes(app, baseUrl)

app.use((err, req, res, next) => {
    console.error(`err: ${err}`)
    res.status(500).json({ errorMessage: err.message })
})

app.listen(port, () => console.log(`aluguel-carros-api running on port ${port}`))