import { state } from '../data-access/state/state';
import { login } from '../data-access/api-calls/calls';

export const login = async (username, password) => {
  const result = await login(username, password);
  state.token = result.token;
};
