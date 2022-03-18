import { Client } from '../clients/client.model';
import { Product } from '../products/product.model';

export interface License {
  id: number;
  key: string;
  description: string;
  type: string;
  expiry: string;
  status: boolean;
  customer: string;
  client: Client;
  iproduct: string;
  product: Product;
  created_at?: string;
  updated_at?: string;
}
