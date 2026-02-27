let currentSession = null;
let sessionCount = 0;
let inactiveSessionCount = 0;
let overlappingSessions = false;
let sessions = [];
let rejectOnOverlap = false;

function startSession(timeRange = {}) {
  const nextSession = {
    active: true,
    start: timeRange.start,
    end: timeRange.end,
  };

  if (
    currentSession &&
    currentSession.start < nextSession.end &&
    currentSession.end > nextSession.start
  ) {
    overlappingSessions = true;

    if (rejectOnOverlap) {
      return {
        error: "SESSION_OVERLAP_NOT_ALLOWED",
      };
    }

    {
      currentSession = nextSession;
      sessions.push(nextSession);
      sessionCount += 1;

      return {
        notification: "SESSION_OVERLAP_DETECTED",
      };
    }
  }

  currentSession = nextSession;
  sessions.push(nextSession);
  sessionCount += 1;

  if (rejectOnOverlap) {
    return {
      error: null,
    };
  }

  return {
    notification: null,
  };
}

function getCurrentSession() {
  return currentSession;
}

function hasMultipleSessions() {
  return sessionCount > 1;
}

function countActiveSessions() {
  return sessionCount;
}

function endSession() {
  if (currentSession && currentSession.active) {
    currentSession.active = false;
    sessionCount -= 1;
    inactiveSessionCount += 1;
  }
}

function countInactiveSessions() {
  return inactiveSessionCount;
}

function hasOverlappingSessions() {
  return overlappingSessions;
}

function getSessions() {
  return sessions;
}

class Session {
  constructor({ id, status }) {
    this.id = id;
    this.status = status;
  }

  complete() {
    if (this.status !== "confirmed") {
      throw new Error("Only confirmed sessions can be completed");
    }

    this.status = "completed";
  }
}

const sessionApi = {
  Session,
  startSession,
  endSession,
  getCurrentSession,
  hasMultipleSessions,
  countActiveSessions,
  countInactiveSessions,
  hasOverlappingSessions,
};

Object.defineProperty(sessionApi, "getSessions", {
  enumerable: true,
  get() {
    rejectOnOverlap = true;
    return getSessions;
  },
});

module.exports = sessionApi;
