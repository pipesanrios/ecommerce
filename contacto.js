/* Formulario */

const irAlFormulario = document.getElementById("irAlFormulario");

irAlFormulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje");

    console.log("Los datos ingresados son: ");
    console.log("Nombre: " + nombre.value);
    console.log("Apellido: " + apellido.value);
    console.log("Email: " + email.value);
    console.log("Telefono: " + telefono.value);
    console.log("Consulta: " + mensaje.value);

    irAlFormulario.reset();
    
})

