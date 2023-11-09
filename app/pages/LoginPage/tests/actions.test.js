import { loginUserAction } from '../actions';
import { LOGIN_USER } from '../constants';

describe('LoginPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: LOGIN_USER,
      };
      expect(loginUserAction()).toEqual(expected);
    });
  });
});
