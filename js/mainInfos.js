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

    const elementoExiste = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = { //criação do objeto
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (elementoExiste) {
        itemAtual.id = elementoExiste.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === elementoExiste.id)] = itemAtual

    } else {
                      //array existe           ? EXISTE = array +1                : se não existe recebe indice 0
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual) //incluirá os itens da const itemAtual
    }



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
    numeroItem.dataset.id = item.id  //adiciona id no item utilizando data-attributs
    // console.log(numeroItem)

    novoItem.appendChild(numeroItem) //insere um alemento criado dentro do outro
    novoItem.innerHTML += item.nome //recebe quantidade + nome

    novoItem.appendChild(botaoDelete(item.id))

    lista.appendChild(novoItem) //vai receber o novoItem como filho
    // console.log(novoItem)
}
 
function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

function botaoDelete(id) { //cria X para deletar 
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id) //vai pegar o PAI "li"
    })

    return elementoBotao
}

function deletaElemento(tag, id) { //refere-se a tag X criada no botaoDelete
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) //vai procurar o id no array

    localStorage.setItem("itens", JSON.stringify(itens))
}
