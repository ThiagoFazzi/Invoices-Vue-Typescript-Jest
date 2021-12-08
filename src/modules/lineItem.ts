import Decimal from 'decimal.js';
import { Product } from '@/Types/product';
import { LineItem } from '../Types/invoice';

function create(product: Product, rate: Decimal, quantity: number) : LineItem {
  return {
    product,
    rate,
    quantity,
  };
}

function calculateLineTotal(lineItem: LineItem) : Decimal {
  return lineItem.rate.times(lineItem.quantity);
}

export default {
  create,
  calculateLineTotal,
};
