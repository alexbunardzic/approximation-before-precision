describe("HTTP Adapter", () => {
    test("HTTP adapter implements scheduling port", () => {
      const adapter = require("../../src/adapters/httpAdapter");
      expect(adapter).toHaveProperty("scheduleSession");
    });
  });
  