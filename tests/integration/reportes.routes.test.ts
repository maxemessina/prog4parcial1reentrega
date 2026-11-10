
import { describe, it, expect } from "vitest";
import request from "supertest";
import { Router } from "express";
import { createApp } from "../../src/app";
import { PedidoService } from "../../src/services/pedidoService";
import { CafeExpreso } from "../../src/models/CafeExpreso";
import { TomaReportesRouter } from "../../src/routes/reportes.routes";

describe("GET /reportes/facturacion", () => {
  it("devuelve la suma de los pedidos registrados", async () => {
    const producto = new CafeExpreso(1, "Pocillo", "Brasil");

    const catalogo = {
      obtenerProductoPorId: (id: number) =>
        id === 1 ? producto : undefined,
    };

    const pedidoService = new PedidoService(catalogo);

    pedidoService.crearPedido([
      { productoId: 1, cantidad: 1 },
    ]);

    pedidoService.crearPedido([
      { productoId: 1, cantidad: 2 },
    ]);

    const reportesRouter = TomaReportesRouter(pedidoService);

    const app = createApp({
      productos: Router(),
      pedidos: Router(),
      reportes: reportesRouter,
    });

    const res = await request(app).get("/reportes/facturacion");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      facturacionTotal: 15060,
    });
  });
});
