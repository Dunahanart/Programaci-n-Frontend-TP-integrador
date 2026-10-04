import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// Devuelve el mensaje de error, o una cadena vacía si el formulario es válido.
const validarFormulario = () => {
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    if (email.value.trim() === "") {
        return "El campo email es obligatorio.";
    }

    if (email.validity.typeMismatch) {
        return "El email no tiene un formato válido (ejemplo: juan@mail.com).";
    }

    if (mensaje.value.trim().length < 10) {
        return "El mensaje debe tener al menos 10 caracteres.";
    }

    return "";
};

document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const formulario = document.querySelector(".form-contacto");
    const cajaError = document.getElementById("error-formulario");

    // El evento "submit" se dispara al presionar el botón "Enviar"
    formulario.addEventListener("submit", (evento) => {
        const error = validarFormulario();

        if (error !== "") {
            evento.preventDefault(); // freno el envío hacia Formspree
            cajaError.textContent = error;
        }
    });

    // Mientras el usuario vuelve a escribir limpiamos el mensaje
    formulario.addEventListener("input", () => {
        cajaError.textContent = "";
    });
});
