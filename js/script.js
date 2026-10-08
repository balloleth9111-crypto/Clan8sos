// ==========================================
// ESTADO DE LA APLICACIÓN (CARRITO)
// ==========================================
let carrito = [];
let total = 0;

// SELECCIÓN DE ELEMENTOS DEL DOM PARA EL CARRITO
const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total-precio');
const btnVaciar = document.getElementById('btn-vaciar');
const carritoVacioMsj = document.getElementById('carrito-vacio-msj');
const botonesAgregar = document.querySelectorAll('.btn-agregar');

// ==========================================
// 1. MÓDULO DE CARRITO DE COMPRAS
// ==========================================

// Capturar clics en botones con atributos data-*
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    const nombre = e.target.getAttribute('data-nombre');
    const precio = parseFloat(e.target.getAttribute('data-precio'));

    agregarAlCarrito(id, nombre, precio);
  });
});

// Agregar producto al arreglo
function agregarAlCarrito(id, nombre, precio) {
  carrito.push({ id, nombre, precio });
  total += precio;
  actualizarCarritoHTML();
}

// Renderizado dinámico de filas en la tabla del carrito
function actualizarCarritoHTML() {
  // Limpiar contenido previo
  listaCarrito.innerHTML = '';

  if (carrito.length === 0) {
    if (carritoVacioMsj) carritoVacioMsj.style.display = 'block';
  } else {
    if (carritoVacioMsj) carritoVacioMsj.style.display = 'none';

    carrito.forEach((producto, index) => {
      const tr = document.createElement('tr');

      // Columna Nombre
      const tdNombre = document.createElement('td');
      tdNombre.textContent = producto.nombre;

      // Columna Precio
      const tdPrecio = document.createElement('td');
      tdPrecio.textContent = `$${producto.precio.toLocaleString()}`;

      // Columna Botón Eliminar
      const tdAccion = document.createElement('td');
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('btn-eliminar-item');

      btnEliminar.addEventListener('click', () => {
        eliminarProducto(index);
      });

      tdAccion.appendChild(btnEliminar);

      // Ensamblar la fila
      tr.appendChild(tdNombre);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdAccion);

      // Agregar al DOM
      listaCarrito.appendChild(tr);
    });
  }

  // Actualizar el total impreso
  if (totalElemento) {
    totalElemento.textContent = `$${total.toLocaleString()}`;
  }
}

// Eliminar producto individual
function eliminarProducto(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarritoHTML();
}

// Vaciar carrito completo
if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    total = 0;
    actualizarCarritoHTML();
  });
}


// ==========================================
// 2. VALIDACIÓN DEL FORMULARIO DE ADOPCIÓN
// ==========================================
const formulario = document.getElementById('formAdopcion');
const mensaje = document.getElementById('mensajeFormulario');

if (formulario) {
  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const animal = document.getElementById('animal').value;

    // Estilo para alertas visuales
    mensaje.style.color = 'red';
    mensaje.style.fontWeight = 'bold';

    if (nombre.length < 3) {
      mensaje.textContent = 'Por favor ingresa un nombre válido.';
      return;
    }

    if (telefono.length < 7) {
      mensaje.textContent = 'Por favor ingresa un número de teléfono válido.';
      return;
    }

    if (animal === '') {
      mensaje.textContent = 'Por favor selecciona el animal que deseas adoptar.';
      return;
    }

    // Respuesta exitosa
    mensaje.style.color = '#008080';
    mensaje.textContent = `¡Gracias ${nombre}! Hemos recibido tu solicitud para adoptar a ${animal}. Nos comunicaremos contigo pronto.`;

    formulario.reset();
  });
}


// ==========================================
// 3. MODO CLARO / OSCURO (INTERFAZ)
// ==========================================
const btnTema = document.getElementById('btn-tema');

if (btnTema) {
  btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');

    if (document.body.classList.contains('modo-oscuro')) {
      btnTema.textContent = '☀️ Modo Claro';
    } else {
      btnTema.textContent = '🌙 Modo Oscuro';
    }
  });
}