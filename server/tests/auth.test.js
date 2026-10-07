import { test, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

describe("Auth Endpoints Validation Tests", () => {
  test("POST /auth/register fails with 400 when email or password is missing", async () => {
    const res = await request(app).post("/auth/register").send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.message, "All fields are required");
  });

  test("POST /auth/register fails with 406 when passwords mismatch", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password999",
    });

    assert.equal(res.status, 406);
    assert.equal(res.body.message, "Password Mismatch");
  });

  test("POST /auth/login fails with 400 when email or password is missing", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
    });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, "All fields are required");
  });

  test("GET /auth/user fails with 401 when no token is supplied", async () => {
    const res = await request(app).get("/auth/user");

    assert.equal(res.status, 401);
    assert.equal(res.body.message, "No token provided");
  });

  test("GET /auth/user fails with 401 when invalid token is supplied", async () => {
    const res = await request(app)
      .get("/auth/user")
      .set("Authorization", "Bearer fake-token-123");

    assert.equal(res.status, 401);
    assert.equal(res.body.message, "Invalid or expired token");
  });
});
