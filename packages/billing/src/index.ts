import {
  Invoice,
  InvoiceResult,
  InvoiceLine,
  LineResult
} from "./models/Invoice";
import { round } from "./utils/math";

export function calcLine(
  line: InvoiceLine,
  taxRate = 0.05
): LineResult {
  const { quantity, unitPrice } = line;
  const lineSubtotal = round(quantity * unitPrice);
  const lineTax = round(lineSubtotal * taxRate);
  const lineTotal = round(lineSubtotal + lineTax);
  return { ...line, lineSubtotal, lineTax, lineTotal };
}

export function calcInvoice(
  invoice: Invoice,
  options?: { taxRate?: number }
): InvoiceResult {
  const taxRate = options?.taxRate ?? 0.05;

  const lines = invoice.lines.map((line) => calcLine(line, taxRate));

  const subtotal = round(
    lines.reduce((sum, l) => sum + l.lineSubtotal, 0)
  );
  const tax = round(lines.reduce((sum, l) => sum + l.lineTax, 0));
  const grandTotal = round(subtotal + tax);

  return {
    header: {
      id: invoice.id,
      date: invoice.date,
      currency: invoice.currency
    },
    lines,
    subtotal,
    tax,
    grandTotal
  };
}

// 只 re-export 型別與函式 (public API)
export type {
  Invoice,
  InvoiceLine,
  InvoiceResult,
  LineResult
};
