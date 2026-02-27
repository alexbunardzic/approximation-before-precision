const axios = require("axios");

async function notifySessionCreated(sessionData) {
  await axios.post("https://example.com/analytics", sessionData);
}

module.exports = {
  notifySessionCreated,
};
