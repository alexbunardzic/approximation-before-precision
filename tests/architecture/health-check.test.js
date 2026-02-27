const request = require("supertest");
const app = require("../../src/app");

describe("Health Check", () => {
  test("GET /health returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });
});
