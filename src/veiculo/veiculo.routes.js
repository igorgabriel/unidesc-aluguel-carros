const controller = require('./veiculo.controller')

const veiculoRoutes = (app, baseUrl) => {
    app.post(`${baseUrl}/v1/veiculos`, controller.salvar)
    app.get(`${baseUrl}/v1/veiculos`, controller.listar)
    app.get(`${baseUrl}/v1/veiculos/:id`, controller.buscarPorId)
    app.put(`${baseUrl}/v1/veiculos/:id`, controller.alterar)
    app.delete(`${baseUrl}/v1/veiculos/:id`, controller.excluir)
}

module.exports = veiculoRoutes