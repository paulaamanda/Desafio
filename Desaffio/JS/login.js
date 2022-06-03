document.querySelector('#entrar').addEventListener('click', (a)=>{
  a.preventDefault();
  entrar();
});

function entrar() {
  let usuario = document.querySelector('#login');
  let senha = document.querySelector('#senha');

  let listaUser = [];

  let usuarioValido = {
    login: '',
    senha: ''
  }

  listaUser = JSON.parse(localStorage.getItem('usuarios'));

  listaUser.forEach(elemento => {
    if (usuario.value === elemento.login && senha.value === elemento.senha) {
      usuarioValido = {
        id: elemento.id,
        login: elemento.login,
        senha: elemento.senha
      }
    }
  });

  if (usuario.value === usuarioValido.login && senha.value === usuarioValido.senha) {
    alert('Click em ok para ir a sua lista de produtos:)');
    saveSession(usuarioValido.id);
    window.location.href = '../Desaffio/index.html';
  } else {
    alert('Login ou senha incorretos:(');
  }

  function saveSession(data) {
    if (saveSession) {
      localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logado", JSON.stringify(data));
  }

}
