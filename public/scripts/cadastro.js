function checkCpfMask(){
    const cpf = document.getElementById("cpf")
    function updateCpf(value){
        return value
        .replace(/\D/g , "") //
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
    }
    cpf.value = updateCpf(cpf.value)
}

function checkTelefoneMask(){
    const telefone = document.getElementById("telefone")
    function updateTelefone(value){
        return value
        .replace(/\D/g , "") 
        .replace(/(\d{2})(\d)/, "($1)$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
    }
    telefone.value = updateTelefone(telefone.value)
}

function checkCepMask(){
    const cep = document.getElementById("cep")
    function updateCep(value){
        return value
        .replace(/\D/g , "") 
        .replace(/(\d{5})(\d)/, "$1-$2")
    }
    cep.value = updateCep(cep.value)
}


function cepAutoComplete() {
    const cep = document.getElementById("cep")
    if (cep.value.length == 9) {
        const cleanValue = cep.value.replace(/\D/g, "")
        const url = `https://viacep.com.br/ws/${cleanValue}/json/`
    fetch(url)
        .then(res => { 
            if(res.ok) {
                return res.json()
            } 
        })
        .then(cepDados => {
            const enderecoCompleto = document.getElementsByClassName("endereco")
            
            if(cepDados.erro == "true"){
                for(i in enderecoCompleto) {
                    enderecoCompleto[i].value = ""
                }
                alert("Cep Invalido")
            } 
            else {
                enderecoCompleto[0].value = cepDados.localidade
                enderecoCompleto[1].value = cepDados.bairro
                enderecoCompleto[2].value = cepDados.logradouro
                enderecoCompleto[3].value = cepDados.complemento
            }
        })
        .catch(error => {
            alert("Erro na conexão")
        })
    }
}


function giveCpfError() {
    erroCpf = sessionStorage.getItem("erroCpf")
    if(erroCpf == "true") {
        setTimeout(() => {
            alert("Cpf já cadastrado")
        }, 150)
    }
}

giveCpfError()

document.getElementById("cep").addEventListener("keyup", (e) =>{
    cepAutoComplete()
})


