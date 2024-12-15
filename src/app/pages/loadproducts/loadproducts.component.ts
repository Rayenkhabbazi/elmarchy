import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/products/products.module';
import { SproductsService } from '../../services/sproducts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-loadproducts',
  standalone: false,
  templateUrl: './loadproducts.component.html',
  styleUrls: ['./loadproducts.component.css'] // Corrected styleUrl to styleUrls
})
export class LoadproductsComponent implements OnInit {
  productList: Product[] = [];
  products: Product[] = [];
  paginatedProductList: Product[] = [];
  currentPage = 1;
  pageSize = 8; // Show 8 products per page
  totalPages: number[] = [];
  categoryId: number = 0; // To store the selected category ID
  searchTerm : string = ''; // To store the search term
  constructor(
    private productService: SproductsService,
    private route: ActivatedRoute, // For extracting route parameters
    private router: Router,
    private cartService: CartService  // Add this
  ) {}

  // Update pagination based on the current page
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProductList = this.products.slice(start, end);

    const totalPageCount = Math.ceil(this.products.length / this.pageSize);
    this.totalPages = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  // Change page logic
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // Fetch Best Sellers products
  BestSellersProducts(): void {
    this.productService.BestSellersProducts(this.categoryId).subscribe(
      (result: Product[]) => {
        this.productList = result;
        this.products = result;
        this.updatePagination();
      },
      (error: Error) => {
        console.error('Error fetching Best Sellers products:', error);
      }
    );
  }

  // Fetch Featured products
  FeaturedProducts(): void {
    this.productService.FeaturedProducts(this.categoryId).subscribe(
      (result: Product[]) => {
        this.productList = result;
        this.products = result;
        this.updatePagination();
      },
      (error: Error) => {
        console.error('Error fetching Featured Products:', error);
      }
    );
  }

  // Fetch Special Offer products
  SpecialOfferProducts(): void {
    this.productService.SpecialOfferProducts(this.categoryId).subscribe(
      (result: Product[]) => {
        this.productList = result;
        this.products = result;
        this.updatePagination();
      },
      (error: Error) => {
        console.error('Error fetching Special Offer Products:', error);
      }
    );
  }

  // Fetch New Arrival products
  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (result: Product[]) => {
        this.productList = result;
        this.products = result;
        this.updatePagination();
      },
      (error: Error) => {
        console.error('Error fetching All Products:', error);
      }
    );
  }

  // Get products by category
  getProductsByCategory(): void {
    if (this.categoryId) {
      this.productService.getProductsByCategory(this.categoryId).subscribe({
        next: (data: Product[]) => {
          this.products = data;
          this.productList = data;
          this.updatePagination();
        },
        error: (error: Error) => {
          console.error('Error fetching products by category:', error);
        }
      });
    }
  }

  getProductsBysearch(): void {
    this.productService.getProductsByCategory(this.categoryId).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.updatePagination();
      },
      (error: Error) => {
        console.error('Error fetching products by category:', error);
      }
    );
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'] || 0;
      this.searchTerm = params['searchTerm'] || '';

      if (this.categoryId) {
        // If we have a category ID, load products for that category
        this.getProductsByCategory();
      } else if (this.searchTerm) {
        // If we have a search term, search for products
        this.searchProducts(this.searchTerm);
      } else {
        // Otherwise, load all products
        this.loadAllProducts();
      }
    });
  }

  searchProducts(searchTerm: string): void {
    this.productService.searchProductsByName(searchTerm).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.updatePagination();
      },
      (error: Error) => {
        console.error('Error searching products:', error);
      }
    );
  }

  viewProductInfo(productId: number | undefined): void {
    if (productId) {
      this.router.navigate(['/product-info', productId]);
    }
  }
}
