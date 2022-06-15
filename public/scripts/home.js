    function fillEstadoSelect(){
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => {
            return res.json()
        })
        .then(dadosEstados => {
            
        })
    }