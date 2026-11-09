
import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app";
import { Router } from "express";
import productosRouter from "../../src/routes/productos.routes";

const app = createApp({
  productos: productosRouter,
  pedidos: Router(),
  reportes: Router(),
});

describe("GET /productos", () => {
  it("devuelve el catálogo completo de productos", async () => {
    const response = await request(app).get("/productos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
  });
});

