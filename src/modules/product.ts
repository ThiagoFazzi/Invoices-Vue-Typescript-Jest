import { Product } from '../Types/product';

function create(name = '', description = '') : Product {
  return {
    name,
    description,
  };
}

export default {
  create,
};
