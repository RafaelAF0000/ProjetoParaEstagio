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