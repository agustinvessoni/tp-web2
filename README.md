# TP Web 2 - Desarrollo Web 2

## Descripción

Este proyecto consiste en una aplicación web tipo carrito de compras inspirada en Coffee Cart.

La aplicación permite visualizar productos de hardware, agregarlos al carrito de compras, eliminarlos y calcular automáticamente el total de la compra.

El proyecto fue desarrollado siguiendo una arquitectura Full Stack, utilizando frontend, backend, base de datos relacional y pruebas automatizadas.

---

# Tecnologías utilizadas

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Node.js
* Express

## Base de datos

* PostgreSQL

## Testing

* Cypress (Pruebas End-to-End)

---

# Funcionalidades

* Listar productos disponibles.
* Visualizar imágenes, nombres y precios.
* Agregar productos al carrito.
* Eliminar productos del carrito.
* Visualizar contenido del carrito.
* Calcular el total de la compra en tiempo real.
* Persistencia de datos mediante PostgreSQL.
* Validación automática mediante pruebas E2E.

---

# Arquitectura del sistema

Frontend (HTML + CSS + JavaScript)

↓

API REST (Node.js + Express)

↓

PostgreSQL

↓

Respuesta JSON

↓

Actualización dinámica de la interfaz

---

# Base de datos

Se utiliza PostgreSQL para almacenar la información de los productos y del carrito de compras.

## Tabla productos

| Campo  | Tipo          |
| ------ | ------------- |
| id     | SERIAL        |
| nombre | VARCHAR(100)  |
| precio | NUMERIC(10,2) |
| imagen | TEXT          |

## Tabla carrito

| Campo       | Tipo    |
| ----------- | ------- |
| id          | SERIAL  |
| producto_id | INTEGER |

---

# Script de creación

## Crear tabla productos

```sql
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    imagen TEXT NOT NULL
);
```

## Crear tabla carrito

```sql
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id)
);
```

## Datos iniciales

```sql
INSERT INTO productos (nombre, precio, imagen)
VALUES
('Procesador AMD Ryzen 5', 210000, 'https://i.ibb.co/5XQRJgwq/amd-ryzen-5.jpg'),
('Memoria RAM 16GB DDR4', 55000, 'https://i.ibb.co/wZKKgCfj/ram-16gb.jpg'),
('Placa de Video RTX 4060', 450000, 'https://i.ibb.co/1f43ygzJ/rtx-4060.jpg'),
('Disco SSD NVMe 1TB', 85000, 'https://i.ibb.co/3YMHwzZ9/ssd-1tb.jpg'),
('Fuente 750W 80 Plus Gold', 120000, 'https://i.ibb.co/j71JkWz/fuente-750w.jpg');
```

---

# Instalación y ejecución

## 1. Clonar repositorio

```bash
git clone https://github.com/agustinvessoni/tp-web2.git
```

## 2. Instalar dependencias

Ingresar a la carpeta backend:

```bash
cd backend
npm install
```

## 3. Configurar PostgreSQL

Crear una base de datos llamada:

```sql
tp-web2
```

Ejecutar los scripts de creación de tablas e inserción de datos.

## 4. Configurar conexión

Editar el archivo:

```text
backend/db.js
```

con los datos correspondientes a PostgreSQL.

## 5. Ejecutar backend

```bash
node server.js
```

Servidor disponible en:

```text
http://localhost:3000
```

## 6. Ejecutar frontend

Abrir:

```text
frontend/index.html
```

utilizando Live Server.

La aplicación quedará disponible en una URL similar a:

```text
http://127.0.0.1:5500/frontend
```

---

# Endpoints disponibles

## Obtener productos

```http
GET /productos
```

Obtiene todos los productos disponibles.

---

## Agregar producto al carrito

```http
POST /carrito
```

Body:

```json
{
  "producto_id": 1
}
```

---

## Obtener carrito

```http
GET /carrito
```

Obtiene todos los productos agregados al carrito.

---

## Eliminar producto del carrito

```http
DELETE /carrito/:id
```

Elimina un producto del carrito.

---

## Obtener total

```http
GET /carrito/total
```

Devuelve el total acumulado de la compra.

---

# Testing E2E con Cypress

Se implementó una prueba End-to-End para validar el flujo completo de compra.

La prueba verifica:

* Carga de productos desde la API.
* Visualización de productos en pantalla.
* Agregado de productos al carrito.
* Actualización automática del total.
* Eliminación de productos.
* Correcta comunicación entre frontend, backend y base de datos.

## Ejecutar pruebas

Desde la raíz del proyecto:

```bash
npx cypress open
```

Seleccionar:

```text
E2E Testing
```

y ejecutar:

```text
carrito.cy.js
```

---

# Estructura del proyecto

```text
tp-web2/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│
├── tests/
│   ├── carrito.cy.js
│
├── cypress.config.js
│
└── README.md
```

---

# Autor

Agustín Franco Vessoni

Materia: Desarrollo Web 2
Universidad Nacional del Oeste
