// Helpers de interfaz compartidos por las tres páginas.

// Mensaje emergente (toast) que no interrumpe la navegación.
// Reemplaza al alert(), que bloqueaba la pantalla y frenaba la interacción.
let temporizadorToast = null;

export const mostrarMensaje = (texto, tipo = "exito") => {
    let toast = document.getElementById("toast-mensaje");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-mensaje";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = texto;
    toast.classList.remove("toast-exito", "toast-aviso", "toast-visible");

    // Fuerzo un reflow para reiniciar la animación de entrada
    void toast.offsetWidth;

    toast.classList.add(tipo === "aviso" ? "toast-aviso" : "toast-exito");
    toast.classList.add("toast-visible");

    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(() => {
        toast.classList.remove("toast-visible");
    }, 2800);
};

export const actualizarContador = (carrito) => {
    const contador = document.getElementById("contador-carrito");
    if (!contador) {
        return;
    }

    const unidades = carrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
    const texto = ` (${unidades})`;

    if (contador.textContent !== texto) {
        // Reinicio la animación de pulso
        contador.classList.remove("contador-pulso");
        void contador.offsetWidth;
        contador.classList.add("contador-pulso");
    }

    contador.textContent = texto;
};

// $21000 -> $21.000
export const formatearPrecio = (valor) =>
    `$${new Intl.NumberFormat("es-AR").format(valor)}`;
