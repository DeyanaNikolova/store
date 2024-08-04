import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductBoxComponent } from './components/product-box/product-box.component';

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
export class HomeComponent {
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
;  category: string | undefined;

  onColumnsCoutChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
