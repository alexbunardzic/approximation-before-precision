const { startSession } = require('../../src/domain/session');

describe('Session Domain – INTERFACE (Intent to notify)', () => {
  test('returns notification intent when overlap occurs', () => {
    startSession({
      start: new Date('2026-03-01T10:00:00Z'),
      end: new Date('2026-03-01T11:00:00Z')
    });

    const result = startSession({
      start: new Date('2026-03-01T10:30:00Z'),
      end: new Date('2026-03-01T11:30:00Z')
    });

    expect(result).toEqual({
      notification: 'SESSION_OVERLAP_DETECTED'
    });
  });
});
