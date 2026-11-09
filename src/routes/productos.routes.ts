import { Router } from "express";

const router = Router();

const productos = [
  { id: 1, nombre: "Café expreso", precio: 1500 },
  { id: 2, nombre: "Café filtrado", precio: 1800 },
  { id: 3, nombre: "Muffin", precio: 2000 },
];

// GET productos (devuelve todos los productos.)
router.get("/", (_req, res) => {
  res.status(200).json(productos);
});

// GET productos/:id (busca y devuelve el producto con ID === ID)
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const producto = productos.find((p) => p.id === id);
// Si el id no coincide con ninguno devuelve 404.
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  return res.status(200).json(producto);
});

export default router;