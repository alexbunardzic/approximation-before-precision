const { startSession, countActiveSessions } = require('../../src/domain/session');

describe('Session Domain – MANY', () => {
  test('counts active sessions', () => {
    startSession();
    startSession();

    expect(countActiveSessions()).toBe(2);
  });
});
