const KEY = "carrito";

// Agrupa por id y garantiza que cada producto tenga cantidad >= 1.
// Además sirve para migrar carritos guardados con el formato anterior
// (una fila por cada clic, sin el campo "cantidad").
const normalizarCarrito = (lista) => {
    if (!Array.isArray(lista)) {
        return [];
    }

    return lista.reduce((acumulado, producto) => {
        const cantidad = Math.max(1, parseInt(producto.cantidad, 10) || 1);
        const existente = acumulado.find((item) => item.id === producto.id);

        if (existente) {
            existente.cantidad += cantidad;
        } else {
            acumulado.push({ ...producto, cantidad });
        }

        return acumulado;
    }, []);
};

export const guardaCarrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito));
};

export const obtenerCarrito = () => {
    let guardado = null;

    try {
        guardado = JSON.parse(localStorage.getItem(KEY));
    } catch (error) {
        console.error("El carrito guardado estaba dañado y se reinicia:", error);
    }

    return normalizarCarrito(guardado);
};

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY);
};
