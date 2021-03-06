import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { CategoryType, CustomerType, InvoiceType, PeriodType, ProductType } from '../interfaces'

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 15000
});

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string, params?: AxiosRequestConfig) => instance.get(url, params).then(responseBody),
}

export const Product = {
  getProducts: (): Promise<ProductType[]> => requests.get('products')
}

export const Invoice = {
  getInvoices: (params?: AxiosRequestConfig): Promise<InvoiceType[]> => requests.get('invoices', params)
}

export const Customer = {
  getCustomers: (params?: AxiosRequestConfig): Promise<CustomerType[]> => requests.get('customers-revenues', params)
}

export const Category = {
  getCategories: (params?: AxiosRequestConfig): Promise<CategoryType[]> => requests.get('categories-revenues', params)
}

export const Period = {
  getMonthly: (params?: AxiosRequestConfig): Promise<PeriodType[]> => requests.get('monthly-revenues', params),
  getWeekly: (params?: AxiosRequestConfig): Promise<PeriodType[]> => requests.get('weekly-revenues', params)
}
