const {
    startSession,
    endSession,
    countInactiveSessions
  } = require('../../src/domain/session');
  
  describe('Session Domain – MANY', () => {
    test('counts inactive sessions', () => {
      startSession();
      startSession();
  
      endSession();
  
      expect(countInactiveSessions()).toBe(1);
    });
  });
  