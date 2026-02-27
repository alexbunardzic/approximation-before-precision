const { startSession, getSessions } = require('../../src/domain/session');

describe('Session Domain – EXCEPTION', () => {
  test('rejects overlapping session', () => {
    startSession({
      start: new Date('2026-03-01T10:00:00Z'),
      end: new Date('2026-03-01T11:00:00Z')
    });

    const result = startSession({
      start: new Date('2026-03-01T10:30:00Z'),
      end: new Date('2026-03-01T11:30:00Z')
    });

    expect(result).toEqual({
      error: 'SESSION_OVERLAP_NOT_ALLOWED'
    });

    expect(getSessions().length).toBe(1);
  });
});
