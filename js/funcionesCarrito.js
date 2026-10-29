import {
    guardaCarrito,
    obtenerCarrito,
    vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardaCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje(`Se agregó «${producto.nombre}» al carrito`);
};

// Suma o resta unidades. Si llega a 0 se elimina del carrito.
export const cambiarCantidad = (id, cambio) => {
    const carrito = obtenerCarrito();
    const producto = carrito.find((item) => item.id === id);

    if (!producto) {
        return;
    }

    if (producto.cantidad + cambio < 1) {
        eliminarProducto(id);
        return;
    }

    producto.cantidad += cambio;
    guardaCarrito(carrito);
    actualizarContador(carrito);
};

export const eliminarProducto = (id) => {
    const carrito = obtenerCarrito();
    const producto = carrito.find((item) => item.id === id);
    const restantes = carrito.filter((item) => item.id !== id);

    guardaCarrito(restantes);
    actualizarContador(restantes);
    mostrarMensaje(
        `Se quitó «${producto ? producto.nombre : "el producto"}» del carrito`,
        "aviso",
    );
};

// con notificar = false no avisa (para avisar con un mensaje propio)
export const vaciarCarrito = (notificar = true) => {
    vaciarCarritoStorage();
    actualizarContador([]);

    if (notificar) {
        mostrarMensaje("Carrito vaciado", "aviso");
    }
};

export const calcularTotal = (carrito) =>
    carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

export const contarUnidades = (carrito) =>
    carrito.reduce((total, producto) => total + producto.cantidad, 0);
