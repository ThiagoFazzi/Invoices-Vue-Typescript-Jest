import { User } from '../Types/user';

function create(name = '', avatar = '') : User {
  return {
    name,
    avatar,
  };
}

export default {
  create,
};
