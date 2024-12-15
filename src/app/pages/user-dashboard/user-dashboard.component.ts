import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  order_date: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  orders: Order[] = [];
  cartItems: any[] = [];
  user: any;
  activeTab: 'orders' | 'cart' | 'profile' = 'cart';
  cartTotal: number = 0;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {
    if (this.isBrowser()) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
  }

  ngOnInit(): void {
    this.loadUserOrders();
    this.loadCartItems();
    
    // Subscribe to cart changes to update total
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.updateCartTotal();
    });
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loadUserOrders() {
    if (this.user?.id) {
      this.http.get<Order[]>(`http://localhost:5000/api/orders/${this.user.id}`)
        .subscribe({
          next: (orders) => {
            this.orders = orders;
          },
          error: (error) => {
            console.error('Error loading orders:', error);
          }
        });
    }
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  switchTab(tab: 'orders' | 'cart' | 'profile') {
    this.activeTab = tab;
  }

  calculateTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
      this.updateCartTotal();
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateCartTotal();
  }

  updateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  proceedToCheckout() {
    if (this.cartItems.length > 0) {
      const order = {
        products: this.cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        })),
        delivery_address: this.user.address,
        payment_method: 'credit_card'
      };

      // Get token from localStorage
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      this.http.post('http://localhost:5000/orders', order, { headers }).subscribe({
        next: (response: any) => {
          // Clear the cart after successful order
          this.cartItems.forEach(item => {
            this.cartService.removeFromCart(item.product.id);
          });
          // Navigate to success page with order details
          this.router.navigate(['/payment-success'], { 
            state: { 
              orderId: response.order_id,
              totalAmount: response.total_amount,
              deliveryAddress: response.delivery_address,
              status: response.status
            }
          });
        },
        error: (error) => {
          console.error('Error creating order:', error);
          alert('Failed to place order. Please try again.');
        }
      });
    }
  }
} 