# Tienda Esotérica — TP integrador · Programación Frontend

Sitio estático de una tienda de artículos esotéricos: catálogo con buscador,
carrito de compras persistente y formulario de contacto.

**No usa base de datos ni framework**: HTML + CSS + JavaScript (módulos ES) y
`data/productos.json` como fuente del catálogo. Las bases de datos están fuera
del alcance de esta entrega.

- **Integrantes:** Leonardo De Filippis · Juan Del Castillo
- **Materia:** Programación Frontend
- **Carpeta local del proyecto:** `tienda-esoterica` (sin espacios ni caracteres especiales, según la pauta)

## Demo

<https://dunahanart.github.io/Programaci-n-Frontend-TP-integrador/index.html>

## Estructura

```
tienda-esoterica/
├── index.html               # Inicio: catálogo de productos + buscador
├── css/
│   └── styles.css           # Estilos, media queries y prefers-reduced-motion
├── js/
│   ├── index.js             # Render del catálogo, búsqueda y feedback de alta
│   ├── carrito.js           # Vista del carrito: cantidades, total y acciones
│   ├── funcionesCarrito.js  # Lógica del carrito: agregar, cantidades, eliminar, total
│   ├── storage.js           # Persistencia en localStorage + normalización de datos
│   ├── ui.js                # Mensajes (toast), contador del header, formato de precios
│   └── contacto.js          # Validación del formulario de contacto
├── pages/
│   ├── carrito.html         # Carrito de compras
│   └── contacto.html        # Formulario de contacto
├── data/
│   └── productos.json       # Catálogo: id, nombre, descripción, precio e imagen
└── img/                     # Logos, imágenes de productos e íconos de redes
```

## Cómo ejecutarlo

El proyecto usa **módulos ES** (`import`/`export`) y `fetch` sobre un archivo
JSON, así que **no alcanza con hacer doble clic en `index.html`**: el navegador
bloquea ambas cosas bajo `file://` y no se vería nada.

Hay que servirlo con cualquier servidor estático:

| Cómo | Comando / paso |
|---|---|
| Live Server (VS Code) | Botón *Go Live* sobre `index.html` |
| Python | `python -m http.server 8080` → <http://localhost:8080/index.html> |
| PHP | `php -S localhost:8080` → <http://localhost:8080/index.html> |

## Funcionalidades

Requisitos mínimos del enunciado (pág. 4):

| Requisito | Dónde está implementado |
|---|---|
| Mostrar el catálogo | `js/index.js` → `renderizarProductos()`, desde `data/productos.json` |
| Buscar o filtrar | `js/index.js` → `pintarProductos()`; busca por nombre **y** descripción, sin distinguir tildes ni mayúsculas |
| Agregar al carrito | `js/funcionesCarrito.js` → `agregarAlCarrito()` |
| Cambiar cantidades | `js/funcionesCarrito.js` → `cambiarCantidad()`; controlador **− / +** en `js/carrito.js` |
| Eliminar productos | `js/funcionesCarrito.js` → `eliminarProducto()` y `vaciarCarrito()` |
| Calcular el total | `js/funcionesCarrito.js` → `calcularTotal()` / `contarUnidades()`, mostrados en `#resumen-carrito` |

Además:

- **Carrito agrupado por producto**: cada producto aparece una sola vez con su
  cantidad, en lugar de una fila por cada clic.
- **Persistencia**: el carrito vive en `localStorage` y se normaliza al leerlo
  (`storage.js`), por lo que también entiende el formato anterior y tolera
  JSON corrupto.
- **Mensajes sin `alert()`**: `mostrarMensaje()` en `js/ui.js` genera un *toast*
  no bloqueante con `role="status"` y `aria-live="polite"`.
- **Feedback visual**: *skeleton* mientras hace el `fetch`, entrada animada de
  las tarjetas, botón «✓ Agregado», pulso del contador del carrito y *hover*
  con borde dorado.
- **Accesibilidad**: foco visible por teclado, etiquetas `<label>` en los
  formularios, jerarquía de encabezados `h1 > h2 > h3`, `alt` en todas las
  imágenes y soporte de `prefers-reduced-motion`.

## Pruebas y depuración realizadas

Ejecutadas el 29/10/2026 contra una copia local servida con `python -m http.server`.

| Prueba | Resultado |
|---|---|
| **Responsive**: 320, 360, 480, 768 y 1280 px en las 3 páginas | ✅ Sin desborde horizontal (`scrollWidth === clientWidth`) y ningún elemento fuera del viewport |
| **Lighthouse** en `index`, `carrito` y `contacto` | ✅ 100 accesibilidad · 100 mejores prácticas · 100 SEO (0 fallas) |
| **Contraste** elemento por elemento (WCAG AA) | ✅ 0 fallas. Botón *Eliminar* 3.3:1 → **5.3:1**; etiquetas del formulario 3.79:1 → **5.1:1** |
| **Errores de consola** en las 3 vistas | ✅ 0 |
| **Imágenes rotas** | ✅ 0 |
| **Flujo del carrito**: agregar ×2 → cantidades → subtotal → total → eliminar → vaciar → finalizar | ✅ Total verificado a mano ($88.000 = 3 × $21.000 + $25.000) |
| **Búsqueda**: `pendulo`, `TALISMAN`, `energias`, `varita magica` | ✅ Encuentra `Péndulo`, `Talismán`, `Quit Mágico`, `Varita mágica` (insensible a tildes y mayúsculas) |
| **Estado vacío** de la búsqueda | ✅ «No encontramos productos para «qqq».» + contador `0 de 6 productos` |

**Errores detectados y corregidos durante la depuración**

1. El `<nav>` del header medía 416 px en una pantalla de 345 px y producía un
   desplazamiento horizontal en móvil → se redujo el `padding` y se agregó
   `flex-wrap` en la media query `max-width: 600px`.
2. El texto del formulario daba 3.79:1 sobre el gris `#7D7D7D` → pasó a negro
   (5.1:1), igual que el `header` y el `footer`.
3. En `carrito.html` se saltaba del `h1` a los `h3` de las tarjetas → se agregó
   el `h2` «Tu selección».
4. El bloque de 47 líneas comentado en `index.html` volvió a aparecer tras una
   modificación posterior → se eliminó y se verificó con `git diff`.
5. Tras agregar cantidades, un carrito guardado con el formato anterior quedaba
   duplicado → `normalizarCarrito()` agrupa por `id` y migra el formato viejo.

## Declaración de uso de inteligencia artificial

> *Requisito de la pauta de la entrega (pág. 5). Revisá y ajustá este párrafo
> a lo que realmente hiciste antes de entregar.*

En el desarrollo de este TP se utilizó un asistente de inteligencia artificial
como herramienta de apoyo. Los usos concretos fueron: (1) planteo y revisión de
la lógica de las funciones del carrito y del render del catálogo; (2) detección
de defectos —contraste insuficiente, salto de encabezados, desbordes en
pantalla chica— y propuesta de las correcciones aplicadas; (3) redacción de los
comentarios del código y de esta documentación.

Todo el código fue leído, comprendido, adaptado y verificado por el equipo
antes de subirlo: ninguna sección se incorporó sin entenderla. No se copió
código de otros proyectos ni de sitios de terceros.

**Recursos externos declarados:** Google Fonts (tipografías *Cinzel* y
*EB Garamond*). El resto de los recursos —imágenes, iconos y estilos— es propio
del proyecto y está en `img/` y `css/`.

El equipo se hace responsable del contenido final del entregable.

## Créditos

Trabajo práctico integrador de la materia Programación Frontend ·
Leonardo De Filippis y Juan Del Castillo.
