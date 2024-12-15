import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products/products.module';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }
  /*addToCart(product: Product): Observable<void> {
    this.cart.push(product);
    return of(); // Simulating API response
  }*/
}
