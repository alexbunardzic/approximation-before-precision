describe("Application Boot", () => {
    test("Application boots without crashing", () => {
      expect(() => require("../../src/app")).not.toThrow();
    });
  });

  