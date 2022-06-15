const app = require("../config/server")

module.exports = () => {
    app.get("/home", (req, res) => {
        const session = req.session
        if (session.logado == true) {
            res.render("home.ejs")
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