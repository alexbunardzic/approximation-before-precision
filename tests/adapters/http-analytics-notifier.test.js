const axios = require("axios");
const notifier = require("../../src/adapters/analytics/httpAnalyticsNotifier");

describe("HTTP Analytics Notifier", () => {
  test("exports notifySessionCreated", () => {
    expect(notifier).toHaveProperty("notifySessionCreated");
  });

  test("posts analytics payload", async () => {
    const spy = jest.spyOn(axios, "post").mockResolvedValue({});
    const payload = { id: "s-1" };

    await notifier.notifySessionCreated(payload);

    expect(spy).toHaveBeenCalledWith("https://example.com/analytics", payload);
    spy.mockRestore();
  });
});
