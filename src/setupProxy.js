const proxy = require("http-proxy-middleware")
require("../public/config")

module.exports = function (app) {
    app.use(
        proxy("/api/system", {
            target: 'http://localhost:8300/',
            changeOrigin: true,
            pathRewrite: {
                '^/api/system': '',
            }
        })
    )
    app.use(
        proxy("/api/database", {
            target: 'http://localhost:8200/dts/',
            changeOrigin: true,
            pathRewrite: {}
        })
    )
    app.use(
        proxy("/api/process", {
            target: 'http://localhost:8400/',
            changeOrigin: true,
            pathRewrite: {
                '^/api/process': '',
            }
        })
    )
}