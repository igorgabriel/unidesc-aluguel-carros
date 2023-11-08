const controller = require('./locacao.controller')

const locacaoRoutes = (app, baseUrl) => {
    app.post(`${baseUrl}/v1/locacoes`, controller.salvar)
    app.get(`${baseUrl}/v1/locacoes`, controller.listar)
    app.get(`${baseUrl}/v1/locacoes/:id`, controller.buscarPorId)
    app.put(`${baseUrl}/v1/locacoes/:id`, controller.alterar)
    app.delete(`${baseUrl}/v1/locacoes/:id`, controller.excluir)
}

module.exports = locacaoRoutes