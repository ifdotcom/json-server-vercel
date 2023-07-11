// See https://github.com/typicode/json-server#module
// se agrego fs:
const fs = require('fs')
// se agregó path:
const path = require('path')
//se agrego auth:
const auth = require('json-server-auth')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
// se agrego port:
const port = process.env.PORT || 8080
//se agrego rules
const rules = auth.rewriter(JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json'))));
// /!\ Bind the router db to the app
app.db = router.db

server.use(middlewares)
// Add this before server.use(router)
// se modificó:
server.use(rules)
server.use(router)
// Se agregó
app.use(auth)
server.listen(port, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
