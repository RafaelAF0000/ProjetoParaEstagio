const app = require("../config/server")

module.exports = () => {
    app.get('/sobre', (req, res) => {
        res.render("sobre.ejs")
    })
}