export interface ProductType {
  id: number,
  category: string,
  name: string,
  sale_price: number,
  margin: number
}

export interface CustomerType {
  customer_id: number,
  customer_name: string,
  total_revenue: number,
  total_margin: number,
  invoices_count: number
}

export interface InvoiceLineType {
  product_id: number,
  product_name: string,
  product_category: string,
  unit_price: number,
  quantity: number,
  total_line: number,
  total_margin: number
}

export interface InvoiceType {
  id: number,
  customer_id: number,
  customer_name: string,
  date: string,
  invoice_lines: InvoiceLineType[],
  region: string,
  total_invoice: number,
  total_margin: number
}

export interface KpiType {
  label: string,
  value: number
}

export interface CategoryType {
  category_name: string,
  total_revenue: number,
  total_margin: number
}
