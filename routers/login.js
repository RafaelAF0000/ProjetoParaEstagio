const app = require("../config/server")
module.exports = () => {
    app.get("/login", (req, res) => {
        res.render("login.ejs")
    })
}

    app.post("/logar", (req,res) => {
        const dados = req.body
        const session = req.session
        console.log(dados)
        
        if((dados.nome == "admin") && (dados.senha == "admin")) {
            session.logado = true
            res.redirect("/home")
        } 
        else {
            res.redirect("/login")
        }
    })