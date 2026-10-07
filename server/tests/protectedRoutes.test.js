import { test, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

describe("Protected Routes Security Tests", () => {
  describe("Admin Routes Protection", () => {
    test("GET /api/admin/dashboard-stats rejects unauthenticated request with 401", async () => {
      const res = await request(app).get("/api/admin/dashboard-stats");
      assert.equal(res.status, 401);
      assert.equal(res.body.message, "No token provided");
    });

    test("GET /api/admin/users rejects unauthenticated request with 401", async () => {
      const res = await request(app).get("/api/admin/users");
      assert.equal(res.status, 401);
      assert.equal(res.body.message, "No token provided");
    });

    test("GET /api/admin/properties rejects unauthenticated request with 401", async () => {
      const res = await request(app).get("/api/admin/properties");
      assert.equal(res.status, 401);
      assert.equal(res.body.message, "No token provided");
    });

    test("POST /api/admin/properties rejects unauthenticated request with 401", async () => {
      const res = await request(app)
        .post("/api/admin/properties")
        .send({ title: "Unauthorized Property" });
      assert.equal(res.status, 401);
      assert.equal(res.body.message, "No token provided");
    });
  });

  describe("Saved Properties Routes Protection", () => {
    test("GET /api/saved-properties rejects unauthenticated request with 401", async () => {
      const res = await request(app).get("/api/saved-properties");
      assert.equal(res.status, 401);
      assert.equal(res.body.message, "No token provided");
    });

    test("POST /api/saved-properties/:id rejects unauthenticated request with 401", async () => {
      const res = await request(app).post("/api/saved-properties/mock-prop-id");
      assert.equal(res.status, 401);
      assert.equal(res.body.message, "No token provided");
    });
  });
});
