import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoadproductsComponent } from './pages/loadproducts/loadproducts.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductinfoComponent } from './pages/productinfo/productinfo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:categoryId', component: LoadproductsComponent },
  { path: 'products/search/:searchTerm', component: LoadproductsComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product-info/:id', component: ProductinfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
