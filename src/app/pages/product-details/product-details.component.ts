import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SproductsService } from '../../services/sproducts.service';
import { Product, Review } from '../../model/products/products.module';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  newReview: Review = { author: '', content: '', rating: 5 };
  userRating: number = 0;
  isSubmittingReview: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: SproductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct(productId);
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  setRating(rating: number): void {
    this.userRating = rating;
    this.newReview.rating = rating;
  }

  submitReview(): void {
    if (!this.product?.id || !this.newReview.content) return;

    this.isSubmittingReview = true;
    const review = {
      ...this.newReview,
      product_id: this.product.id
    };

    this.productService.addReview(this.product.id, review).subscribe({
      next: () => {
        this.loadProduct(this.product!.id!);
        this.newReview = { author: '', content: '', rating: 5 };
        this.isSubmittingReview = false;
      },
      error: (error) => {
        console.error('Error submitting review:', error);
        this.isSubmittingReview = false;
      }
    });
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < rating ? 1 : 0);
  }

  addToCart(product: Product): void {
    if (product) {
      this.cartService.addToCart(product);
      alert('Product added to cart!');
    }
  }
} 