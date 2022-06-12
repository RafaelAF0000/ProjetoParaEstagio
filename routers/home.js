const app = require("../config/server")

module.exports = () => {
    app.get("/home", (req, res) => {
        res.render("home.ejs")
    })
}