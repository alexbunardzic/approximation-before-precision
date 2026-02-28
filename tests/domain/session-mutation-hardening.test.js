function freshSessionModule() {
  jest.resetModules();
  return require("../../src/domain/session");
}

describe("Session Domain mutation hardening", () => {
  test("starts with no overlap detected", () => {
    const { hasOverlappingSessions } = freshSessionModule();
    expect(hasOverlappingSessions()).toBe(false);
  });

  test("boundary-touching sessions do not overlap", () => {
    const { startSession, hasOverlappingSessions } = freshSessionModule();

    startSession({
      start: new Date("2026-03-01T10:00:00Z"),
      end: new Date("2026-03-01T11:00:00Z"),
    });

    const result = startSession({
      start: new Date("2026-03-01T11:00:00Z"),
      end: new Date("2026-03-01T12:00:00Z"),
    });

    expect(result).toEqual({ notification: null });
    expect(hasOverlappingSessions()).toBe(false);
  });

  test("sessions ending at current start do not overlap", () => {
    const { startSession, hasOverlappingSessions } = freshSessionModule();

    startSession({
      start: new Date("2026-03-01T10:00:00Z"),
      end: new Date("2026-03-01T11:00:00Z"),
    });

    const result = startSession({
      start: new Date("2026-03-01T09:00:00Z"),
      end: new Date("2026-03-01T10:00:00Z"),
    });

    expect(result).toEqual({ notification: null });
    expect(hasOverlappingSessions()).toBe(false);
  });

  test("notify mode adds overlapping session", () => {
    const { startSession, countActiveSessions } = freshSessionModule();

    startSession({
      start: new Date("2026-03-01T10:00:00Z"),
      end: new Date("2026-03-01T11:00:00Z"),
    });

    const result = startSession({
      start: new Date("2026-03-01T10:30:00Z"),
      end: new Date("2026-03-01T11:30:00Z"),
    });

    expect(result).toEqual({ notification: "SESSION_OVERLAP_DETECTED" });
    expect(countActiveSessions()).toBe(2);
  });

  test("returns false for multiple sessions when only one exists", () => {
    const { startSession, hasMultipleSessions } = freshSessionModule();
    startSession();
    expect(hasMultipleSessions()).toBe(false);
  });

  test("ending without a current session is a no-op", () => {
    const { endSession, countActiveSessions, countInactiveSessions } = freshSessionModule();

    expect(() => endSession()).not.toThrow();
    expect(countActiveSessions()).toBe(0);
    expect(countInactiveSessions()).toBe(0);
  });

  test("ending same session twice only updates counters once", () => {
    const { startSession, endSession, countActiveSessions, countInactiveSessions } =
      freshSessionModule();

    startSession();
    endSession();
    endSession();

    expect(countActiveSessions()).toBe(0);
    expect(countInactiveSessions()).toBe(1);
  });

  test("getSessions is enumerable and switches to reject contract.", () => {
    const domain = freshSessionModule();
    expect(Object.keys(domain)).toContain("getSessions");

    const { startSession, getSessions } = domain;
    getSessions();

    const result = startSession({
      start: new Date("2026-03-01T14:00:00Z"),
      end: new Date("2026-03-01T15:00:00Z"),
    });

    expect(result).toEqual({ error: null });
  });
});
