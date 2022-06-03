const form = document.querySelector('#formin');
const tabela = document.querySelector('#tbody');
const divErro = document.querySelector('#msg-erro');
let gx = form.gx.value;

let usuarioId = Number(sessionStorage.getItem('logado'));

const session = localStorage.getItem("session");

logadoOuNao();

function logadoOuNao(){
    if(session){
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if(!usuarioId){
        window.location.href = "login.html";
        return;
    }
}

const atualizarLocalStorage = (produtos) => { localStorage.setItem('produtos', JSON.stringify(produtos)) }
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos') || '[]');
const salvarProduto = (a) => {
    a.preventDefault()

    const nome = form.nome.value
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;

    if (gx == 'novo') {

        const produtos = recuperarLocalStorage();
        produtos.push({ id: produtos.length + 1, nome, preco, prime });
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
    } else {
        let produto = { id: gx, nome, preco, prime }
        atualizarProduto(gx, produto);
        preencherTabela();
        form.reset();
        gx = 'novo';
    }   
}

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for (const produto of produtos) {
        tabela.innerHTML += ` 

        <tr>
            <th scope="row">${produto.id}</th>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.prime ? "sim" : "não"} </td>
            <td>
                <img width="40" src="img/lapin.png" onclick="editarProduto(${produto.id})"> 
                <img width="40" src="img/lixin.png" onclick="removerProduto(${produto.id})"> 
            </tb>
        </tr>
        
        `;

    }
}
const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id);
    if (indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert("Click em ok para remover produto da sua lista.")
    preencherTabela();
}

const editarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    gx = id;
    console.log(gx);

}
const atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);

}





console.log(usuarioId);

form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);

document.querySelector('#sair').addEventListener('click', function(){
    saindo();
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = "login.html";
}