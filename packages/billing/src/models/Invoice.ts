export interface InvoiceLine {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  date: string; // ISO 8601
  currency: string;
  lines: InvoiceLine[];
}

export interface LineResult extends InvoiceLine {
  lineSubtotal: number; // 未稅
  lineTax: number;
  lineTotal: number;    // 含稅
}

export interface InvoiceResult {
  header: Omit<Invoice, "lines">;
  lines: LineResult[];
  subtotal: number;
  tax: number;
  grandTotal: number;
}
