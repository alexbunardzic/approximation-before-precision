const createSessionModule = require("../../src/domain/createSession");

describe("Create Session Domain Function", () => {
  test("exports createSession", () => {
    expect(createSessionModule).toHaveProperty("createSession");
  });

  test("returns the same session payload", async () => {
    const payload = { id: "s-1" };
    const result = await createSessionModule.createSession(payload);

    expect(result).toBe(payload);
  });
});
