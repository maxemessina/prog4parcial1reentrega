import { describe, expect, it, vi } from "vitest";
import { Muffin } from "../../src/models/Muffin";
import { PedidoService } from "../../src/services/pedidoService";

describe("PedidoService", () => {
  it("crea un pedido con su total calculado", () => {
    const muffin = new Muffin(1);
    const productoService = {
      obtenerProductoPorId: vi.fn().mockReturnValue(muffin),
    };
    const pedidoService = new PedidoService(productoService);

    const pedido = pedidoService.crearPedido([
      { productoId: 1, cantidad: 2 },
    ]);

    expect(pedido).toEqual({
      id: 1,
      items: [{ productoId: 1, cantidad: 2 }],
      estado: "pendiente",
      total: 5000,
    });
  });

  it("lista los pedidos que fueron creados", () => {
    const muffin = new Muffin(1);
    const productoService = {
      obtenerProductoPorId: vi.fn().mockReturnValue(muffin),
    };
    const pedidoService = new PedidoService(productoService);

    pedidoService.crearPedido([{ productoId: 1, cantidad: 1 }]);
    pedidoService.crearPedido([{ productoId: 1, cantidad: 2 }]);

    expect(pedidoService.listarPedidos()).toEqual([
      {
        id: 1,
        items: [{ productoId: 1, cantidad: 1 }],
        estado: "pendiente",
      },
      {
        id: 2,
        items: [{ productoId: 1, cantidad: 2 }],
        estado: "pendiente",
      },
    ]);
  });
});
