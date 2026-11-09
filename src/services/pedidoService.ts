import type { Pedido, PedidoConTotal, PedidoItem } from "../models/Pedido";
import type { Producto } from "../models/Producto";

interface ProductoLookup {
  obtenerProductoPorId(id: number): Producto | undefined;
}

export class PedidoService {
  private readonly pedidos: Pedido[] = [];
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

    const pedido: Pedido = {
      id: this.siguienteId++,
      items: items.map((item) => ({ ...item })),
      estado: "pendiente",
    };

    this.pedidos.push(pedido);

    return {
      ...this.copiarPedido(pedido),
      total,
    };
  }

  listarPedidos(): Pedido[] {
    return this.pedidos.map((pedido) => this.copiarPedido(pedido));
  }

  obtenerPedidoPorId(id: number): Pedido | undefined {
    const pedido = this.pedidos.find((pedido) => pedido.id === id);

    return pedido ? this.copiarPedido(pedido) : undefined;
  }

  calcularFacturacionTotal(): number {
    return this.pedidos.reduce(
      (total, pedido) => total + this.calcularTotalPedido(pedido),
      0,
    );
  }

  private calcularTotalPedido(pedido: Pedido): number {
    return pedido.items.reduce((total, item) => {
      const producto = this.productos.obtenerProductoPorId(item.productoId);

      if (!producto) {
        throw new Error(`Producto con ID ${item.productoId} no encontrado`);
      }

      return total + producto.calcularPrecio() * item.cantidad;
    }, 0);
  }

  private copiarPedido(pedido: Pedido): Pedido {
    return {
      ...pedido,
      items: pedido.items.map((item) => ({ ...item })),
    };
  }
}