const conexaoDb = require("../config/conexaoDb")
const app = require("../config/server")
const con = conexaoDb()

module.exports = () => {
    app.get("/home", (req, res) => {
        const session = req.session
        if (session.logado == true) {
            con.query("SELECT nome, cpf, cep FROM user", (error,result) => {
                if(error) {
                    res.redirect("/login")
                }
                else {
                    res.render("home.ejs", {dadosUser : result})
                }
            })
        } 
        else {
            res.redirect("/login")
        }
    })
}

    app.post("/deslogar", (req,res) => {
        const session = req.session
        session.logado = false
        res.redirect("/login")
    })