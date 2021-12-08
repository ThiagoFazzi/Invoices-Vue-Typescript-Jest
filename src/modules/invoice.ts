import Decimal from 'decimal.js';
import { User } from '@/Types/user';
import { Invoice, LineItem } from '@/Types/invoice';
import LineItemM from '@/modules/lineItem';

function calculateTotal(invoice: Invoice) : Decimal {
  return invoice.lineItems
    .map(LineItemM.calculateLineTotal)
    .reduce((sum, curr) => sum.plus(curr), new Decimal(0));
}

function setLineItems(invoice: Invoice, lineItems: LineItem[]) : Invoice {
  const updateInvoice = {
    ...invoice,
    lineItems,
  };
  return {
    ...updateInvoice,
    totalAmount: calculateTotal(updateInvoice),
  };
}

function create(user: User) : Invoice {
  return {
    createdBy: user,
    lineItems: [],
    totalAmount: new Decimal(10),
  };
}

function addLineItem(invoice: Invoice, lineItem: LineItem) : Invoice {
  const lineItems = [...invoice.lineItems, lineItem];
  return setLineItems(invoice, lineItems);
}

function removeLineItem(invoice: Invoice, index: number) : Invoice {
  const lineItems = invoice.lineItems.filter((val, i) => i !== index);
  return setLineItems(invoice, lineItems);
}

function changeLineItem(invoice: Invoice, index: number, newLineItem: LineItem) : Invoice {
  const lineItems = invoice.lineItems.map((item, i) => (i === index ? newLineItem : item));
  return setLineItems(invoice, lineItems);
}

export default {
  create,
  addLineItem,
  removeLineItem,
  changeLineItem,
};
