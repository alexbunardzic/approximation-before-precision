const { getCurrentSession } = require('../../src/domain/session');

describe('Session Domain – ZERO', () => {
  test('returns null when no sessions exist', () => {
    const session = getCurrentSession();

    expect(session).toBeNull();
  });
});
