import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SproductsService } from '../../services/sproducts.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../model/products/products.module';

@Component({
  selector: 'app-productinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: SproductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.error = null;
    
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        console.log('Loaded product:', product);
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product details. Error: ' + err.message;
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      // Optional: Show success message or notification
      console.log(`Added ${this.quantity} ${this.product.name} to cart`);
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
