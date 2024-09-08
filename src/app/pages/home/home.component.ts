import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    MatSidenavModule,
    MatGridListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category: string | undefined;

  products: Product[] | undefined;
  sort = 'desc';
  count = '12';
  productsSubscribtion: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscribtion = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }
  
  onColumnsCoutChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(newCount: number): void{
    this.count = newCount.toString();
    this.getProducts();
  }
  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscribtion){
      this.productsSubscribtion.unsubscribe();
    }
  }
}
