import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, formatearPrecio } from "./ui.js";

let productos = [];

// Quita tildes y pasa a minúsculas para que "pendulo" encuentre "Péndulo"
const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const contenedor = () => document.getElementById("contenedor-tarjetas");

// Bloques de carga mientras se resuelve el fetch
const mostrarSkeleton = () => {
    const caja = contenedor();
    caja.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "skeleton";
        tarjeta.setAttribute("aria-hidden", "true");
        tarjeta.innerHTML =
            '<span class="skeleton-img"></span>' +
            '<span class="skeleton-linea"></span>' +
            '<span class="skeleton-linea corta"></span>' +
            '<span class="skeleton-linea corta"></span>';
        caja.appendChild(tarjeta);
    }
};

const crearTarjeta = (producto, posicion) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "text-dark", "card-entrada");
    tarjeta.style.animationDelay = `${Math.min(posicion * 70, 630)}ms`;

    const img = document.createElement("img");
    img.src = `./${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("card-desc");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.classList.add("card-precio");
    precio.textContent = formatearPrecio(producto.precio);

    const boton = document.createElement("button");
    boton.classList.add("btn", "bg-secondary", "text-dark");
    boton.textContent = "Agregar al carrito";

    // El botón confirma el alta y vuelve solo a su estado inicial
    let temporizador = null;

    boton.addEventListener("click", () => {
        agregarAlCarrito(producto);

        clearTimeout(temporizador);
        boton.classList.add("btn-agregado");
        boton.textContent = "✓ Agregado";

        temporizador = setTimeout(() => {
            boton.classList.remove("btn-agregado");
            boton.textContent = "Agregar al carrito";
        }, 1400);
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(boton);

    return tarjeta;
};

const pintarProductos = () => {
    const caja = contenedor();
    const buscador = document.getElementById("buscar-producto");
    const estado = document.getElementById("buscador-estado");
    const texto = normalizar(buscador.value.trim());

    const filtrados = productos.filter((producto) =>
        normalizar(`${producto.nombre} ${producto.descripcion}`).includes(texto),
    );

    caja.innerHTML = "";

    if (filtrados.length) {
        filtrados.forEach((producto, posicion) => {
            caja.appendChild(crearTarjeta(producto, posicion));
        });
    } else {
        const aviso = document.createElement("p");
        aviso.className = "sin-resultados";
        aviso.textContent = `No encontramos productos para «${buscador.value.trim()}».`;
        caja.appendChild(aviso);
    }

    estado.textContent = texto
        ? `${filtrados.length} de ${productos.length} productos`
        : `${productos.length} productos disponibles`;
};

const configurarBuscador = () => {
    const buscador = document.getElementById("buscar-producto");
    buscador.addEventListener("input", pintarProductos);
    buscador.addEventListener("search", pintarProductos); // botón de borrar
};

const renderizarProductos = () => {
    mostrarSkeleton();

    fetch("./data/productos.json")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`HTTP ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((data) => {
            productos = data.productos;
            configurarBuscador();
            pintarProductos();
        })
        .catch((error) => {
            console.error("No se pudo cargar el catálogo:", error);
            contenedor().innerHTML =
                "<p class='sin-resultados'>No pudimos cargar el catálogo. Recargá la página.</p>";
        });
};

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador(obtenerCarrito());
    renderizarProductos();
});
