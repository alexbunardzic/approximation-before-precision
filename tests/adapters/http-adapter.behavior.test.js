jest.mock("../../src/domain/createSession", () => ({
  createSession: jest.fn(async (sessionData) => ({
    ...sessionData,
    created: true,
  })),
}));

jest.mock("../../src/adapters/analytics/httpAnalyticsNotifier", () => ({
  notifySessionCreated: jest.fn(async () => {}),
}));

const httpAdapter = require("../../src/adapters/httpAdapter");
const { createSession } = require("../../src/domain/createSession");
const { notifySessionCreated } = require("../../src/adapters/analytics/httpAnalyticsNotifier");

describe("HTTP Adapter behavior", () => {
  test("schedules by creating and notifying", async () => {
    const payload = { id: "s-1" };
    const result = await httpAdapter.scheduleSession(payload);

    expect(createSession).toHaveBeenCalledWith(payload);
    expect(notifySessionCreated).toHaveBeenCalledWith(result);
    expect(result).toEqual({ id: "s-1", created: true });
  });
});
