import { test, describe } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

describe("Middleware Unit Tests", () => {
  describe("isAdmin middleware", () => {
    test("allows access when user role is admin", () => {
      let nextCalled = false;
      const req = { user: { userId: "123", role: "admin" } };
      const res = {};
      const next = () => {
        nextCalled = true;
      };

      isAdmin(req, res, next);
      assert.equal(nextCalled, true);
    });

    test("denies access with 403 when user role is regular user", () => {
      let statusSent = null;
      let bodySent = null;
      let nextCalled = false;

      const req = { user: { userId: "123", role: "user" } };
      const res = {
        status(code) {
          statusSent = code;
          return {
            json(body) {
              bodySent = body;
            },
          };
        },
      };
      const next = () => {
        nextCalled = true;
      };

      isAdmin(req, res, next);
      assert.equal(statusSent, 403);
      assert.equal(bodySent.message, "Access denied. Admins only");
      assert.equal(nextCalled, false);
    });
  });

  describe("auth middleware", () => {
    test("rejects request with 401 when Authorization header is missing", async () => {
      let statusSent = null;
      let bodySent = null;
      const req = { headers: {} };
      const res = {
        status(code) {
          statusSent = code;
          return {
            json(body) {
              bodySent = body;
            },
          };
        },
      };

      await auth(req, res, () => {});
      assert.equal(statusSent, 401);
      assert.equal(bodySent.message, "No token provided");
    });

    test("rejects request with 401 when Authorization header is not Bearer", async () => {
      let statusSent = null;
      let bodySent = null;
      const req = { headers: { authorization: "Basic 123456" } };
      const res = {
        status(code) {
          statusSent = code;
          return {
            json(body) {
              bodySent = body;
            },
          };
        },
      };

      await auth(req, res, () => {});
      assert.equal(statusSent, 401);
      assert.equal(bodySent.message, "No token provided");
    });

    test("rejects request with 401 when token is invalid or malformed", async () => {
      let statusSent = null;
      let bodySent = null;
      const req = { headers: { authorization: "Bearer invalid.token.value" } };
      const res = {
        status(code) {
          statusSent = code;
          return {
            json(body) {
              bodySent = body;
            },
          };
        },
      };

      await auth(req, res, () => {});
      assert.equal(statusSent, 401);
      assert.equal(bodySent.message, "Invalid or expired token");
    });
  });
});
