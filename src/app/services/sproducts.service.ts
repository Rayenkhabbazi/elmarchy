import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/products/products.module';

@Injectable({
  providedIn: 'root'
})
export class SproductsService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  BestSellersProducts(categoryId?: number): Observable<Product[]> {
    const params = new HttpParams().set('category_id', categoryId?.toString() || '');
    return this.http.get<Product[]>(`${this.apiUrl}/products/best-sellers`, { params });
  }

  FeaturedProducts(categoryId?: number): Observable<Product[]> {
    const params = new HttpParams().set('category_id', categoryId?.toString() || '');
    return this.http.get<Product[]>(`${this.apiUrl}/products/featured`, { params });
  }

  SpecialOfferProducts(categoryId?: number): Observable<Product[]> {
    const params = new HttpParams().set('category_id', categoryId?.toString() || '');
    return this.http.get<Product[]>(`${this.apiUrl}/products/special-offers`, { params });
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  searchProductsByName(name: string): Observable<Product[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Product[]>(`${this.apiUrl}/product/search`, { params });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  addReview(productId: number, review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${productId}/reviews`, review);
  }
}
