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

    function fillEstadoTable(){
        const tdEstado = document.getElementsByClassName("tdEstado")
        const tdCep = document.getElementsByClassName("tdCep")
        for (let i = 0; i < tdCep.length; i++) {
            const cleanValue = tdCep[i].innerText.replace(/\D/g, "")
            const url = `https://viacep.com.br/ws/${cleanValue}/json/`
            fetch(url)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then(dadosCep => {
                tdEstado[i].innerText = dadosCep.uf
            })
        }
    }

fillEstadoTable()

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

// Usado para apresentar a Mensagem de erro caso o banco de dados Esteja Vazio
window.addEventListener("load", filtrarEstado) 