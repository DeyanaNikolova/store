import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any)=>{
      let stripe = await  loadStripe('pk_test_51PwgoTRoUS4NQ6GWDqh7tk3jk7iYX4RwgOjfwgFaKU7odiHAQuoNNdhHZAcz9McFgIrEEyJfncw3sUDnZ1tBLtE000Ds0UcgXn');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
