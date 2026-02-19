import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";

let testInvalidToken = jwt.sign({ username: "invaliduser" }, "INVALID_SECRET", { expiresIn: "1h" });
let expiredToken = jwt.sign({ username: "expireduser" }, process.env.JWT_SECRET, { expiresIn: "1ms" });
let testUserToken;
let nonExistingUsername = `nonexistinguser${Date.now()}`;
let testUsername = `testuser${Date.now()}`;
let testEmail = `testuser${Date.now()}@example.com`;
let testPassword = `testpassword${Date.now()}`;

describe("Auth routes", () => {
  // 400 - Bad Request (missing fields)
  it("POST /api/auth/register returns 400 when fields are missing", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.status).toBe(400);
  });

  it("POST /api/auth/login returns 400 when fields are missing", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("GET /api/user/me returns 400 without token", async () => {
    const res = await request(app).get("/api/user/me");
    expect(res.status).toBe(400);
  });

  it(`GET /api/user/:${nonExistingUsername} returns 404 when username is invalid`, async () => {
    const res = await request(app).get(`/api/user/${nonExistingUsername}`);
    expect(res.status).toBe(404);
  });

  // 401 - Unauthorized (invalid credentials or token)
  it("POST /api/auth/login returns 401 for invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid@example.com", password: "invalidpassword" });
    expect(res.status).toBe(401);
  });

  it("GET /api/user/me returns 401 with invalid token", async () => {
    const res = await request(app)
      .get("/api/user/me")
      .set("Authorization", `Bearer ${testInvalidToken}`);
    expect(res.status).toBe(401);
  });

  it("GET /api/user/me returns 401 with expired token", async () => {
    const res = await request(app)
      .get("/api/user/me")
      .set("Authorization", `Bearer ${expiredToken}`);
    expect(res.status).toBe(401);
  });

  // 404 - Not Found (non-existing user)
  it("GET /api/user/:username returns 404 for non-existing username", async () => {
    const res = await request(app).get(`/api/user/${nonExistingUsername}`);
    expect(res.status).toBe(404);
  });

  // 201 - Created (successful registration)
  it("POST /api/auth/register creates a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: testUsername,
      email: testEmail,
      password: testPassword,
    });
    expect(res.status).toBe(201);
  });

  // 200 - OK (successful login and access to protected route)
  it("POST /api/auth/login returns a token for valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: testPassword,
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    testUserToken = res.body.token; // Save the token for later tests
  });

  it("GET /api/user/me returns user data with valid token", async () => {
    const userRes = await request(app)
      .get("/api/user/me")
      .set("Authorization", `Bearer ${testUserToken}`);
    expect(userRes.status).toBe(200);
    expect(userRes.body.username).toBe(testUsername);
  });

  it("GET /api/user/:username returns user data for existing username", async () => {
    const res = await request(app).get(`/api/user/${testUsername}`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe(testUsername);
  });
});