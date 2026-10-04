import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarProductos = () => {
  const contenedor = document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) =>
      data.productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.classList.add("card-desc");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        //Agregamos la tarjeta al DOM
        contenedor.appendChild(tarjeta);
      }),
    )
    .catch((error) => {
      console.error("No se pudo cargar el catálogo:", error);
      contenedor.innerHTML =
        "<p class='card-desc'>No pudimos cargar el catálogo. Recargá la página.</p>";
    });

};

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});
