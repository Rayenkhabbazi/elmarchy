import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';

const routes: Routes = [
  { path: '', component: CartComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartComponent,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { } 