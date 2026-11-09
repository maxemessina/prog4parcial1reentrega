import type { PedidoConTotal, PedidoItem } from "../models/Pedido";
import type { Producto } from "../models/Producto";

interface ProductoLookup {
  obtenerProductoPorId(id: number): Producto | undefined;
}

export class PedidoService {
  private siguienteId = 1;

  constructor(private readonly productos: ProductoLookup) {}

  crearPedido(items: PedidoItem[]): PedidoConTotal {
    const total = items.reduce((acumulado, item) => {
      const producto = this.productos.obtenerProductoPorId(item.productoId);

      if (!producto) {
        throw new Error(`Producto con ID ${item.productoId} no encontrado`);
      }

      return acumulado + producto.calcularPrecio() * item.cantidad;
    }, 0);

    return {
      id: this.siguienteId++,
      items: items.map((item) => ({ ...item })),
      estado: "pendiente",
      total,
    };
  }
}