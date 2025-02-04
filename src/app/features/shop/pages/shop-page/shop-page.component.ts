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
import { RouterModule, ActivatedRoute } from '@angular/router';
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
  isLoading = true;

  // Pagination
  currentPage = 1;
  pageSize = 12;

  // Filters
  selectedCategory = '';
  selectedType = '';
  productTypes = ['manga', 'merchandise'];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly = false;
  sortBy = 'title';
  maxPriceValue: number = 100;
  priceRange: number[] = [0, 100];
  searchQuery?: string;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'];
      this.loadProducts();
    });
    this.loadMaxPrice();
    this.loadCategories();
  }

  onTypeChange(type: string): void {
    this.selectedType = this.selectedType === type ? '' : type;
    this.currentPage = 1;
    this.loadProducts();
  }

  onCategoryChange(category: string): void {
    console.log('Category clicked:', category);
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
    this.sortBy = 'title';
    this.currentPage = 1;
    this.loadProducts();
  }

  private loadCategories(): void {
    this.shopService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Loaded categories:', categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    const filters = {
      type: this.selectedType || undefined,
      category: this.selectedCategory || undefined,
      inStock: this.inStockOnly || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      search: this.searchQuery // Add search query to filters
    };
    
    console.log('Loading products with filters:', filters);
    
    this.shopService.getProducts(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      filters,
      this.searchQuery
    ).subscribe({
      next: (data) => {
        console.log('Received data:', data);
        this.productsData = data;
        this.isLoading = false;
        if (this.productsSection) {
          this.productsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  private loadMaxPrice(): void {
    this.shopService.getMaxPrice().subscribe({
      next: (maxPrice) => {
        this.maxPriceValue = maxPrice;
        this.priceRange = [0, maxPrice];
      },
      error: (error) => {
        console.error('Error loading max price:', error);
      }
    });
  }

  onPriceRangeChange(): void {
    this.minPrice = this.priceRange[0];
    this.maxPrice = this.priceRange[1];
    this.applyFilters();
  }
}