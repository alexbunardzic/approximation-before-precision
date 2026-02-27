const { createSession } = require("../domain/createSession");
const { notifySessionCreated } = require("./analytics/httpAnalyticsNotifier");

async function scheduleSession(sessionData) {
  const session = await createSession(sessionData);
  await notifySessionCreated(session);
  return session;
}

module.exports = {
  scheduleSession,
};
