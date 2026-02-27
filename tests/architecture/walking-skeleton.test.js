const request = require("supertest");

describe("Walking Skeleton", () => {
  test("POST /sessions returns 201", async () => {
    const app = require("../../src/app");

    const res = await request(app)
      .post("/sessions")
      .send({ title: "Test" });

    expect(res.statusCode).toBe(201);
  });
});

test("GET /health returns OK", async () => {
    const app = require("../../src/app");
  
    const res = await request(app).get("/health");
  
    expect(res.statusCode).toBe(200);
  });
  