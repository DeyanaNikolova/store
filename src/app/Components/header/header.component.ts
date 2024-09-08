import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService) {}

  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }
}
