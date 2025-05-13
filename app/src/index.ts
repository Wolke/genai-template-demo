import { calcInvoice, Invoice } from "@internal/billing";

const invoice: Invoice = {
  id: "INV-001",
  date: "2023-10-01",
  currency: "TWD",
  lines: [
    { description: "Item A", quantity: 2, unitPrice: 100 },
    { description: "Item B", quantity: 1, unitPrice: 200 }
  ]
};
const result = calcInvoice(invoice, { taxRate: 0.05 });
console.log(result);