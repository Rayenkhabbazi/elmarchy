import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PaymentSuccessComponent implements OnInit {
  orderDetails: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderDetails = navigation?.extras?.state;
  }

  ngOnInit(): void {
    if (!this.orderDetails) {
      this.router.navigate(['/']);
    }
  }
} 