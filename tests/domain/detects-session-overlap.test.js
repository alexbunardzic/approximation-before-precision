const {
    startSession,
    hasOverlappingSessions
  } = require('../../src/domain/session');
  
  describe('Session Domain – BOUNDARY (Overlap)', () => {
    test('detects overlapping sessions', () => {
      startSession({
        start: new Date('2026-03-01T10:00:00Z'),
        end: new Date('2026-03-01T11:00:00Z')
      });
  
      startSession({
        start: new Date('2026-03-01T10:30:00Z'),
        end: new Date('2026-03-01T11:30:00Z')
      });
  
      expect(hasOverlappingSessions()).toBe(true);
    });
  });
  