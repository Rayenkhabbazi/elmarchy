import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadproductsComponent } from '../../loadproducts/loadproducts.component';

const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
