
import { Router } from "express";
import { PedidoService } from "../services/pedidoService";

export function TomaReportesRouter(
  pedidoService: PedidoService
) {
  const router = Router();

  router.get("/facturacion", (_req, res) => {
    const facturacionTotal =
      pedidoService.calcularFacturacionTotal();

    res.status(200).json({ facturacionTotal });
  });

  return router;
}
