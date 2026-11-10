import { Router } from "express";
import { PedidoService } from "../services/pedidoService";

export function TomaReportesRouter(
  pedidoService: PedidoService
) {
  const router = Router();

  return router;
}