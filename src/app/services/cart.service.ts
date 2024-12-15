import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/products/products.module';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    if (this.isBrowser()) {
      this.loadCart();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadCart() {
    if (!this.isBrowser()) return;

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.cartItems.next(cart);
        this.updateCartCount();
      } catch (e) {
        console.error('Error parsing cart:', e);
        this.cartItems.next([]);
      }
    }
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
    this.updateCartCount();
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.updateCartCount();
    this.saveCartToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.updateCartCount();
      this.saveCartToLocalStorage();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.cartItemCount.next(0);
    if (this.isBrowser()) {
      localStorage.removeItem('cart');
    }
  }

  private updateCartCount() {
    const count = this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
    this.cartItemCount.next(count);
  }

  private saveCartToLocalStorage() {
    if (!this.isBrowser()) return;

    const cartData = JSON.stringify(this.cartItems.value);
    localStorage.setItem('cart', cartData);
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }
}