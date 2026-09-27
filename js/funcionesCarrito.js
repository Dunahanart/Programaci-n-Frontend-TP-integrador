import {
    guardaCarrito,
    obtenerCarrito,
    vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardaCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("Producto agregado al carrito");
}

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1);// el uno es la cantidad de elementos que va a afectar
    guardaCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("Producto eliminado del carrito");
 }

export const vaciarCarrito = () => {
        vaciarCarritoStorage();
        actualizarContador([]);
        mostrarMensaje("Carrito vaciado"); 
}