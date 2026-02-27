const request = require("supertest");

describe("Walking Skeleton - Input Capability", () => {
  test("System accepts external JSON input", async () => {
    const app = require("../../src/app");

    const payload = { message: "Hello Skeleton" };

    const res = await request(app)
      .post("/input")
      .send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      received: payload,
    });
  });
});
