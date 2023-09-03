export interface User {
  id: number;
  key: string;
  name?: string;
  surname?: string;
  is_admin: number;
  email?: string;
  billing_address?: string;
  billing_cauntry?: string;
  billing_city?: string;
  billing_post_code?: string;
  business_name?: string;
  phone?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_country?: string;
  shipping_post_code?: string;
  vat_number?: string;
}
