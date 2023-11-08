const controller = require('./cliente.controller')

const clienteRoutes = (app, baseUrl) => {
    app.post(`${baseUrl}/v1/clientes`, controller.salvar)
    app.get(`${baseUrl}/v1/clientes`, controller.listar)
    app.get(`${baseUrl}/v1/clientes/:id`, controller.buscarPorId)
    app.put(`${baseUrl}/v1/clientes/:id`, controller.alterar)
    app.delete(`${baseUrl}/v1/clientes/:id`, controller.excluir)
}

module.exports = clienteRoutes