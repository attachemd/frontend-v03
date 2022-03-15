export interface License {
  id: number;
  key: string;
  description: string;
  type: string;
  expiry: string;
  status: boolean;
  customer: string;
  account: {
    first_name: string;
    last_name: string;
  };
  iproduct: string;
  product: {
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}
