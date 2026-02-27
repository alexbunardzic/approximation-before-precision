const { Session } = require('../../src/domain/session');

describe('Session completion policy (S - Simple scenario)', () => {

  test('cannot complete an unconfirmed session', () => {
    const session = new Session({
      id: 's1',
      status: 'pending'
    });

    expect(() => session.complete())
      .toThrow('Only confirmed sessions can be completed');
  });

  test('can complete a confirmed session', () => {
    const session = new Session({
      id: 's2',
      status: 'confirmed'
    });

    session.complete();

    expect(session.status).toBe('completed');
  });
});
