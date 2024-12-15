export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;  // Joined from products table
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  order_date: string;
  total_amount: number;
  delivery_address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method?: string;
  tracking_number?: string;
  items: OrderItem[];
} 