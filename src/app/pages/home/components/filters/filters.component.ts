import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;
  categoriesSunscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSunscription = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSunscription) {
      this.categoriesSunscription?.unsubscribe();
    }
  }
}
