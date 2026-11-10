import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { createApp } from "../../src/app";
import productosRouter from "../../src/routes/productos.routes"

const productos = productosRouter;
const pedidos = express.Router();
const reportes = express.Router();

const app = createApp({ productos, pedidos, reportes });

describe("GET /productos", () => {
  it("debería devolver 200 y una lista de productos", async () => {
    const response = await request(app).get("/productos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /productos/:id", () => {
  it.todo("debería devolver un producto existente");
  it.todo("debería devolver 404 si el producto no existe");
});