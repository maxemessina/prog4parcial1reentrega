
import { describe, expect, it } from "vitest";
import { listarProductos } from "../../src/services/productoService";

describe("ProductoService", () => {
  it("devuelve los 20 productos del catálogo", () => {
    const productos = listarProductos();

    expect(productos).toHaveLength(20);

    expect(productos.filter((p) => p.nombre.startsWith("Café expreso"))).toHaveLength(9);
    expect(productos.filter((p) => p.nombre.startsWith("Café filtrado"))).toHaveLength(9);
    expect(productos.filter((p) => p.nombre === "Muffin de chocolate")).toHaveLength(1);
    expect(productos.filter((p) => p.nombre === "Porción de torta selva negra")).toHaveLength(1);
  });
});
