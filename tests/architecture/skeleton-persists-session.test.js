describe("Walking Skeleton - Persistence Capability", () => {
    test("Application connects to persistence layer", async () => {
      const repository = require("../../src/adapters/persistence/inMemorySessionRepository");
  
      // This call should succeed once persistence is wired
      const result = await repository.ping();
  
      expect(result).toBe("pong");
    });
  });
  