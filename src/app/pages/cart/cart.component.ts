import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { SproductsService } from '../../services/sproducts.service';
import { Product } from '../../model/products/products.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  filteredProducts: Product[] = [];

  constructor(private productService: SproductsService) {}

  ngOnInit() {
    this.productService.getAllProducts();

    
  }
}
