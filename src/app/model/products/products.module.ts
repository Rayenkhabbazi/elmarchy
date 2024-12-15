import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Review {
  author: string;
  content: string;
  rating: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
  category_name?: string;
  image_url: string;
  reviews?: Review[];
  average_rating?: number;
}

export interface Category {
  id: number;               // Unique identifier for the category
  name: string;             // Name of the category
  slug?: string;            // Optional slug for URL-friendly names
  description?: string;     // Optional description of the category
  created_at?: string;      // Optional creation timestamp
  updated_at?: string;      // Optional last updated timestamp
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
