describe("Ports", () => {
    test("Scheduling port exists", () => {
      const ports = require("../../src/ports");
      expect(ports).toHaveProperty("scheduleSession");
    });
  });
  