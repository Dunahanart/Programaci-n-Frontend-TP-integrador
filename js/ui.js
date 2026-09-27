export const actualizarContador = (carrito) => {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = ` (${carrito.length})`;
    }
}

//esta función puede servir para cuando agreguemos alguna librería
export const mostrarMensaje = (texto) => {
    alert(texto);
//switch alert
};