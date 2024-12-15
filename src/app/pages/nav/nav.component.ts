import { Product } from './../../model/products/products.module';

import { SproductsService } from './../../services/sproducts.service';
import { Component, OnInit } from '@angular/core';
import { Category,  } from '../../model/products/products.module';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  categories: Category[] = [];
  isSearchVisible: boolean = false;
  suggestions: Product[] = [];
  cartItemCount: number = 0;
  cartItems: any[] = [];
  isLoggedIn: boolean = false;
  searchTerm: string = '';
  constructor(private SproductsService: SproductsService ,private router: Router, private cartService: CartService, private authService: AuthService) {}
  ngOnInit(): void {
    
    this.SproductsService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: Error) => {
        console.error('Error fetching categories:', error);
      }
    );
    
    this.cartService.getCartItemCount().subscribe(
      count => {
        console.log('Nav received cart count:', count);
        this.cartItemCount = count;
      }
    );

    this.cartService.getCartItems().subscribe(
      items => {
        console.log('Nav received cart items:', items);
        this.cartItems = items;
      }
    );

    // Check login status
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('Login status:', this.isLoggedIn);
  }
  toggleSearchInput(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    this.isSearchVisible = !this.isSearchVisible; // Toggle the input visibility
  }
  selectCategory(categoryId: number): void {
    if (categoryId) {
      this.router.navigate(['/products', categoryId]).then(() => {
        // Reload products after navigation
        window.location.reload();
      });
    }
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerm = input;
    
    if (input.length > 2) {
      this.SproductsService.searchProductsByName(input).subscribe(
        (products: Product[]) => {
          this.suggestions = products;
        },
        (error) => {
          console.error('Error searching products:', error);
          this.suggestions = [];
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  navigateToCart() {
    if (this.isLoggedIn) {
      this.router.navigate(['/user-dashboard'], { fragment: 'shopping-cart' });
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/user-dashboard' } });
    }
  }

  goToLogin() {
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: '/user-dashboard' }
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  searchProducts(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/products/search', this.searchTerm]);
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  viewProductDetails(productId: number): void {
    if (productId > 0) {
      this.router.navigate(['/product', productId]);
    }
  }
}
