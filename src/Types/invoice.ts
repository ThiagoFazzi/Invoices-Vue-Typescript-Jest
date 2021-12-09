import Decimal from 'decimal.js';
import { User } from './user';
import { Product } from './product';

export interface LineItem {
  product: Product
  rate: Decimal
  quantity: number
}

export interface Invoice {
  createdBy: User
  lineItems: LineItem[]
  totalAmount: Decimal
}
