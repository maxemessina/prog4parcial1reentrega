
import { describe, expect, it } from "vitest";
import {
  listarProductos,
  obtenerProductoPorId,
} from "../../src/services/productoService";

describe("ProductoService", () => {
  it("devuelve los 20 productos del catálogo", () => {
    const productos = listarProductos();

    expect(productos).toHaveLength(20);

    expect(productos.filter((p) => p.nombre.startsWith("Café expreso"))).toHaveLength(9);
    expect(productos.filter((p) => p.nombre.startsWith("Café filtrado"))).toHaveLength(9);
    expect(productos.filter((p) => p.nombre === "Muffin de chocolate")).toHaveLength(1);
    expect(productos.filter((p) => p.nombre === "Porción de torta selva negra")).toHaveLength(1);
  });

  it("busca un producto por su ID y devuelve undefined si no existe", () => {
    const productos = listarProductos();

    const producto = obtenerProductoPorId(1);
    const inexistente = obtenerProductoPorId(999);

    expect(producto).toBeDefined();
    expect(producto).toEqual(productos[0]);
    expect(inexistente).toBeUndefined();
  });
});

