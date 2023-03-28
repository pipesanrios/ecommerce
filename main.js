const usuarioAutorizado = "admin";
const contraseniaAutorizada = "admin";
const inicioSeion = document.getElementById("inicioSeion");

inicioSeion.addEventListener("submit", (e) => {
    e.preventDefault();

    usuario = document.getElementById("usuario").value;
    contrasenia = document.getElementById("contrasenia").value;

    if (usuario === usuarioAutorizado && contrasenia === contraseniaAutorizada) {
        window.location = "productos.html";
    }

})



