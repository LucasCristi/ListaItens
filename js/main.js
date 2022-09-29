const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] //jsonparse altera valores string do localstorage para JS

// console.log(itens) 

itens.forEach((elemento) => { // vai manter os itens na tela mesmo dps do f5
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault() //preventDefault serve para pegar os dados antes de ser enviado 

    // console.log(evento) //no console aparece os objetos, o TARGET trás um array com posição fixa, no ELEMENTS há um OBJETO com as infos
    // console.log(evento.target.elements['nome'].value)
    // console.log(evento.target.elements['quantidade'].value)

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = { //criação do objeto
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    criaElemento(itemAtual)

    itens.push(itemAtual) //incluirá os itens da const itemAtual

    localStorage.setItem("itens", JSON.stringify(itens)) //transforma em string os objetos itens para salvar no localStorage, pois só aceita string

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) { //criará html
    // console.log(nome)
    // console.log(quantidade)

    const novoItem = document.createElement('li') //vai criar li no html
    novoItem.classList.add("item") //add classe item na li

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade //vai receber a QUANTIDADE no HTML através do inner
    console.log(numeroItem)

    novoItem.appendChild(numeroItem) //insere um alemento criado dentro do outro
    novoItem.innerHTML += item.nome //recebe quantidade + nome


    lista.appendChild(novoItem) //vai receber o novoItem como filho
    // console.log(novoItem)
}

