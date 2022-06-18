const conexaoDb = require("../config/conexaoDb")
const app = require("../config/server")
const con = conexaoDb()

module.exports = () => {
    app.get("/home", (req, res) => {
        const session = req.session
        if (session.logado == true) {
            con.query("SELECT nome, cpf, cep, estado, email, telefone FROM user", (error,result) => {
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

    app.post("/deletarUsuario", (req,res) => {
        const dados = req.body
        con.query("DELETE FROM user WHERE cpf = ?", dados.cpf, (error,result) =>{
            if (error) {
                console.log(error)
            }
            else {
                res.redirect("/home#Open")
            }
        })
    })

    app.post("/alterar", function (req,res) {
        const dados = req.body
        console.log(dados)

        con.query(`UPDATE user SET ? WHERE cpf = "${dados.cpf}"`, dados, function(error,result){
            if (error){
                console.log(error)
            }
            else {
                res.redirect("/home#Open")
            }
        })
    
    })

