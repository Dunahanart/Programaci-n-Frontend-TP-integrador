import { obtenerCarrito } from "./storage.js";
import {
    calcularTotal,
    cambiarCantidad,
    contarUnidades,
    eliminarProducto,
    vaciarCarrito,
} from "./funcionesCarrito.js";
import { actualizarContador, formatearPrecio, mostrarMensaje } from "./ui.js";

// Controlador de cantidad:  −  [ n ]  +
const crearStepper = (producto) => {
    const stepper = document.createElement("div");
    stepper.classList.add("stepper");

    const botonMenos = document.createElement("button");
    botonMenos.type = "button";
    botonMenos.classList.add("btn-stepper");
    botonMenos.textContent = "−";
    botonMenos.setAttribute("aria-label", `Quitar una unidad de ${producto.nombre}`);

    const cantidad = document.createElement("span");
    cantidad.classList.add("stepper-cantidad");
    cantidad.textContent = producto.cantidad;

    const botonMas = document.createElement("button");
    botonMas.type = "button";
    botonMas.classList.add("btn-stepper");
    botonMas.textContent = "+";
    botonMas.setAttribute("aria-label", `Agregar una unidad de ${producto.nombre}`);

    botonMenos.addEventListener("click", () => {
        cambiarCantidad(producto.id, -1);
        renderizarCarrito();
    });

    botonMas.addEventListener("click", () => {
        cambiarCantidad(producto.id, 1);
        renderizarCarrito();
    });

    stepper.appendChild(botonMenos);
    stepper.appendChild(cantidad);
    stepper.appendChild(botonMas);

    return stepper;
};

// Total y desglose de la compra
const renderizarResumen = (carrito) => {
    const resumen = document.getElementById("resumen-carrito");
    resumen.innerHTML = "";

    if (!carrito.length) {
        return;
    }

    const bloque = document.createElement("div");
    bloque.classList.add("resumen");

    const detalle = document.createElement("p");
    detalle.classList.add("resumen-detalle");

    const productos = carrito.length;
    const unidades = contarUnidades(carrito);
    detalle.textContent =
        `${productos} ${productos === 1 ? "producto" : "productos"} · ` +
        `${unidades} ${unidades === 1 ? "unidad" : "unidades"}`;

    const total = document.createElement("p");
    total.classList.add("resumen-total");
    total.textContent = "Total: ";

    const importe = document.createElement("span");
    importe.textContent = formatearPrecio(calcularTotal(carrito));
    total.appendChild(importe);

    bloque.appendChild(detalle);
    bloque.appendChild(total);
    resumen.appendChild(bloque);
};

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

    // resetear carrito
    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "El carrito está vacío.";

        contenedor.appendChild(mensaje);
        renderizarResumen(carrito);
        return;
    }

    carrito.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
        img.src = `../${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.classList.add("card-precio");
        precio.textContent = `${formatearPrecio(producto.precio)} c/u`;

        const subtotal = document.createElement("p");
        subtotal.classList.add("card-subtotal");
        subtotal.textContent =
            `Subtotal: ${formatearPrecio(producto.precio * producto.cantidad)}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.classList.add("btn", "btn-eliminar-carrito");
        btnEliminar.textContent = "Eliminar producto";

        btnEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
            renderizarCarrito();
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(crearStepper(producto));
        tarjeta.appendChild(subtotal);
        tarjeta.appendChild(btnEliminar);

        contenedor.appendChild(tarjeta);
    });

    const btnFinalizar = document.createElement("button");
    btnFinalizar.type = "button";
    btnFinalizar.classList.add("btn", "btn-finalizar-carrito");
    btnFinalizar.textContent = "Finalizar compra";

    btnFinalizar.addEventListener("click", () => {
        const importe = formatearPrecio(calcularTotal(carrito));
        vaciarCarrito(false); // no muestra el mensaje genérico
        mostrarMensaje(`¡Pedido por ${importe} confirmado!`);
        renderizarCarrito();
    });

    const btnVaciar = document.createElement("button");
    btnVaciar.type = "button";
    btnVaciar.classList.add("btn", "btn-vaciar-carrito");
    btnVaciar.textContent = "Vaciar carrito";

    btnVaciar.addEventListener("click", () => {
        vaciarCarrito();
        renderizarCarrito();
    });

    divAcciones.appendChild(btnFinalizar);
    divAcciones.appendChild(btnVaciar);

    renderizarResumen(carrito);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});
