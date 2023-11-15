const controller = require('./usuario.controller')

const usuarioRoutes = (app, baseUrl) => {
    app.post(`${baseUrl}/v1/usuarios`, controller.salvar)
    app.get(`${baseUrl}/v1/usuarios`, controller.listar)
    app.get(`${baseUrl}/v1/usuarios/:id`, controller.buscarPorId)
    app.put(`${baseUrl}/v1/usuarios/:id`, controller.alterar)
    app.delete(`${baseUrl}/v1/usuarios/:id`, controller.excluir)
}

module.exports = usuarioRoutes