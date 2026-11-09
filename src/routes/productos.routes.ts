
import { Router } from "express";
import { listarProductos } from "../services/productoService";

const router = Router();

router.get("/", (_request, response) => {
  const productos = listarProductos();

  response.status(200).json(productos);
});

export default router;
