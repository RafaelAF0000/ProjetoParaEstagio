    function fillEstadoSelect(){
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => {
            return res.json()
        })
        .then(dadosEstados => {
            const selectEstados = document.getElementById("selectEstado")
            for(index in dadosEstados){
                const estadoInfo = dadosEstados[index]
                selectEstados.innerHTML += `
                <option value = '${estadoInfo.sigla}'> ${estadoInfo.nome}</option>
                `
            }
        })
    }

fillEstadoSelect()

    function openUserDialog() {
        const mostraDadosButton = document.getElementById("mostraDadosUser")
        mostraDadosButton.onclick = () => {
            const dialogUsers = document.getElementById("usuarios")
            dialogUsers.showModal()
        }
    }

openUserDialog()

    function filtrarEstado(){
        const selectEstado = document.getElementById("selectEstado")
        const trDadosUser = document.getElementsByClassName("trDadosUser")
        const tdEstado = document.getElementsByClassName("tdEstado")
        
        let hasResults = false

        for(let i = 0; i < trDadosUser.length; i ++) {

            if (selectEstado.value != "all" && tdEstado[i].innerText != selectEstado.value) {
                trDadosUser[i].style.display = "none"
            }
            else {
                hasResults = true
                trDadosUser[i].style.display = "table-row" //display padrão do Tr
            }
        }
        
        const tabelaUsuarios = document.getElementById("tabelaUsuarios")
        const errorMessage = document.getElementById("errorMessage")

        if(!hasResults) {
            tabelaUsuarios.style.display = "none"
            errorMessage.innerText = "Sem resultados"
        }
        else {
            tabelaUsuarios.style.display = "table"
            errorMessage.innerText = ""
        }

    }

    function checkTelefoneMask(){
        const telefone = document.getElementById("telefoneAlterar")
        function updateTelefone(value){
            return value
            .replace(/\D/g , "") 
            .replace(/(\d{2})(\d)/, "($1)$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
        }
        telefone.value = updateTelefone(telefone.value)
    }

    function showMenuAlterar(){

        const menuAlterar = document.getElementById("caixaAlterar")
        const botaoConfirmar = document.getElementById("botaoConfirmar")
        const botaoAlterar = document.getElementsByClassName("alterar")
        const tdNome = document.getElementsByClassName("tdNome")
        const tdEmail = document.getElementsByClassName("tdEmail")
        const tdTelefone = document.getElementsByClassName("tdTelefone")
        
        for(let i = 0; i < botaoAlterar.length ; i++) {
            botaoAlterar[i].onclick = () => {
                menuAlterar.showModal()
                botaoConfirmar.value = botaoAlterar[i].value
                document.getElementById("nomeAlterar").value = tdNome[i].innerText
                document.getElementById("emailAlterar").value = tdEmail[i].innerText
                document.getElementById("telefoneAlterar").value = tdTelefone[i].innerText
            }
        }
    }

    showMenuAlterar()

window.addEventListener("load", () => {
    filtrarEstado() 

    if(location.hash == "#Open") {
        const dialogUsers = document.getElementById("usuarios")
        dialogUsers.showModal()
        location.hash = ""
    }
}) 