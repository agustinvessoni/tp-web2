const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


/* Ver productos */

app.get("/productos", async (req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT * FROM productos ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});


/* Agregar productos al carrito */

app.post("/carrito", async (req, res) => {
    try {
        const { producto_id } = req.body;

        const resultado = await pool.query(
            "INSERT INTO carrito (producto_id) VALUES ($1) RETURNING *",
            [producto_id]
        );

        res.status(201).json({
            mensaje: "Producto agregado al carrito",
            item: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar al carrito" });
    }
});


/* Ver los productos agregados al carrito */

app.get("/carrito", async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT 
                carrito.id AS carrito_id,
                productos.id AS producto_id,
                productos.nombre,
                productos.precio
            FROM carrito
            JOIN productos ON carrito.producto_id = productos.id
            ORDER BY carrito.id
        `);

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener carrito" });
    }
});


/* Eliminar productos del carrito */

app.delete("/carrito/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM carrito WHERE id = $1 RETURNING *",
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                error: "Producto no encontrado en el carrito"
            });
        }

        res.json({
            mensaje: "Producto eliminado del carrito",
            item: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar del carrito" });
    }
});

/* Ver el total de los productos */

app.get("/carrito/total", async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT SUM(productos.precio) AS total
            FROM carrito
            JOIN productos ON carrito.producto_id = productos.id
        `);

        res.json({
            total: resultado.rows[0].total || 0
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al calcular total" });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});