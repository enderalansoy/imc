import axios, { AxiosResponse } from 'axios';
import { ProductType, CustomerType, InvoiceType, InvoiceLineType, KpiType } from '../interfaces';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const Product = {
  getProducts: (): Promise<ProductType[]> => requests.get('products'),
};
