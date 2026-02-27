const { startSession, hasMultipleSessions } = require('../../src/domain/session');

describe('Session Domain – MANY', () => {
  test('detects when more than one session exists', () => {
    startSession();
    startSession();

    expect(hasMultipleSessions()).toBe(true);
  });
});
