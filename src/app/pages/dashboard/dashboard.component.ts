import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
  image_url: string;
}

interface Order {
  id?: number;
  client_id: number;
  order_date: string;
  total_amount: number;
  status: string;
  products: OrderProduct[];
}

interface OrderProduct {
  product_id: number;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];
  activeTab: 'products' | 'orders' = 'products';
  selectedProduct: Product | null = null;
  selectedOrder: Order | null = null;
  isEditMode = false;
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }

  // Products CRUD
  loadProducts() {
    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  addProduct(product: Product) {
    this.http.post(`${this.apiUrl}/products`, product).subscribe({
      next: () => {
        this.loadProducts();
        this.selectedProduct = null;
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  updateProduct(product: Product) {
    if (!product.id) return;

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.put(`${this.apiUrl}/products/${product.id}`, product, { headers }).subscribe({
      next: () => {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = { ...product };
        }
        this.selectedProduct = null;
        this.isEditMode = false;
        console.log('Product updated successfully');
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      this.http.delete(`${this.apiUrl}/products/${id}`, { headers }).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          console.log('Product deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  // Orders CRUD
  loadOrders() {
    this.http.get<Order[]>('http://localhost:5000/api/orders')
      .subscribe({
        next: (data) => this.orders = data,
        error: (error) => console.error('Error loading orders:', error)
      });
  }

  updateOrderStatus(order: Order, newStatus: string) {
    const updatedOrder = { ...order, status: newStatus };
    this.http.put(`http://localhost:5000/api/orders/${order.id}`, updatedOrder)
      .subscribe({
        next: () => {
          this.loadOrders();
          this.selectedOrder = null;
        },
        error: (error) => console.error('Error updating order:', error)
      });
  }

  // UI Helpers
  selectProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.isEditMode = true;
  }

  cancelEdit() {
    this.selectedProduct = null;
    this.selectedOrder = null;
    this.isEditMode = false;
  }

  switchTab(tab: 'products' | 'orders') {
    this.activeTab = tab;
    this.cancelEdit();
  }

  createNewProduct(): Product {
    return {
      name: '',
      price: 0,
      description: '',
      category_id: 0,
      image_url: ''
    };
  }
}
