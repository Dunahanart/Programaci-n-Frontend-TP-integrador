const KEY = "carrito";

export const guardaCarrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito));
};

export const obtenerCarrito = () => { 
    return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY);
};
