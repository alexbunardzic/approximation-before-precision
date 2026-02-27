const { startSession, getCurrentSession } = require('../../src/domain/session');

describe('Session Domain – ONE', () => {
  test('returns the current session when one session exists', () => {
    startSession();

    const session = getCurrentSession();

    expect(session).not.toBeNull();
  });
});
