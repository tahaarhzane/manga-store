import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { ShopService, Product, PaginatedProducts } from '../../../../core/services/shop.service';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatChipsModule,
    MatBadgeModule,
    RouterModule
  ],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  @ViewChild('productsSection') productsSection!: ElementRef;
  productsData?: PaginatedProducts;
  categories: string[] = [];
  productTypes: ('manga' | 'merchandise')[] = ['manga', 'merchandise'];
  isLoading = true;

  // Pagination
  currentPage = 1;
  pageSize = 12;

  // Filters
  selectedType: 'manga' | 'merchandise' | '' = '';
  selectedCategory = '';
  minPrice?: number;
  maxPrice?: number;
  inStockOnly = false;
  sortBy = 'newest';

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  private loadCategories(): void {
    this.shopService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.shopService.getProducts(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      {
        type: this.selectedType || undefined,
        category: this.selectedCategory || undefined,
        inStock: this.inStockOnly || undefined,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      }
    ).subscribe(data => {
      this.productsData = data;
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onTypeChange(type: 'manga' | 'merchandise'): void {
    this.selectedType = this.selectedType === type ? '' : type;
    this.currentPage = 1;
    this.loadProducts();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.currentPage = 1;
    this.loadProducts();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  resetFilters(): void {
    this.selectedType = '';
    this.selectedCategory = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.inStockOnly = false;
    this.sortBy = 'newest';
    this.currentPage = 1;
    this.loadProducts();
  }

  getUniquePublishers(): number {
    return new Set(this.productsData?.items.map(product => product.publisher)).size || 0;
  }

  getInStockCount(): number {
    return this.productsData?.items.filter(product => product.inStock).length || 0;
  }

  getFeaturedProducts(): Product[] {
    return (this.productsData?.items || [])
      .filter(product => product.discountPrice)
      .sort((a, b) => {
        const discountA = ((a.price - (a.discountPrice || 0)) / a.price) * 100;
        const discountB = ((b.price - (b.discountPrice || 0)) / b.price) * 100;
        return discountB - discountA;
      })
      .slice(0, 3);
  }

  scrollToProducts(): void {
    this.productsSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
