import { product } from './products';

export interface Order {
  id?: number;
  id_customer: number;
  first_name?: string;
  last_name?: string;
  tel?:string;
  email?: string;
  products: [{}];
  shippingClassId?: number;
  discountCodeId?: number;
  shipping_address: string;
  shipping_postal_code: number;
  shipping_country: string;
  shipping_city: string;
  invoice_address: string;
  invoice_postal_code: number;
  invoice_country: string;
  invoice_city: string;
  total?: number;
}
