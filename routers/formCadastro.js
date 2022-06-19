const conexaoDb = require("../config/conexaoDb")
const app = require("../config/server")
const con = conexaoDb()

module.exports = () => {
    app.get("/", (req, res) => {
        const session = req.session
        const dados = {
            isCpfValido : session.isCpfValido
        }
        session.isCpfValido = true
        res.render("paginaCadastro.ejs", dados)
    })
}

app.post("/cadastrar", (req, res) => {
    const dados = req.body
    const session = req.session
    console.log(dados)

    con.query(`SELECT * FROM USER WHERE cpf = '${dados.cpf}'`, (error,result) => {

        if(error) {
            console.log(error)
        } 
        else if(result == "") {
            con.query("INSERT INTO user SET ?", dados, (error, result) => {
                if(error) {
                    console.log(error)
                }
                else {
                    res.redirect("/login")
                }
            })
        } 
        else {
            session.isCpfValido = false
            res.redirect("/")
        }
    }) 
})
