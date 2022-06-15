const app = require("./config/server.js")

const formCadastro = require("./routers/formCadastro.js")
formCadastro(app)
const home = require("./routers/home.js")
home(app)
const login = require("./routers/login.js")
login(app)

////////////////////////////////
app.listen("8000", () => {
    console.log("Servidor up")
})