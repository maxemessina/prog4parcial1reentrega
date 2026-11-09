
import { Router } from "express";
import {
  listarProductos,
  obtenerProductoPorId,
} from "../services/productoService";

const router = Router();

router.get("/", (_request, response) => {
  const productos = listarProductos();

  response.status(200).json(productos);
});
router.get("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      error: "ID de producto inválido",
    });
  }

  const producto = obtenerProductoPorId(id);

  if (!producto) {
    return response.status(404).json({
      error: "Producto no encontrado",
    });
  }

  return response.status(200).json(producto);
});

export default router;
