import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  type: 'manga' | 'merchandise';
  image: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: string[];
  inStock: boolean;
  quantity: number;
  rating: number;
  reviews: number;
  publisher?: string;
  format?: string;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private apiService: ApiService) {}

  getMaxPrice(): Observable<number> {
    return this.apiService.getMaxPrice();
  }

  getProducts(
    page: number, 
    pageSize: number, 
    sort: string, 
    filter?: any,
    searchQuery?: string
  ): Observable<PaginatedProducts> {
    console.log('Shop service filter:', filter);
    
    return this.apiService.getMangas(
      page - 1, 
      pageSize, 
      sort, 
      { ...filter, search: searchQuery }
    ).pipe(
      map((response: any) => ({
        items: response.content.map((manga: any) => this.mapMangaToProduct(manga)),
        total: response.totalElements,
        page: response.number + 1,
        pageSize: response.size,
        totalPages: response.totalPages
      }))
    );
  }

  getCategories(): Observable<string[]> {
    return this.apiService.getCategories().pipe(
      map(categories => Array.from(new Set(categories)).sort())
    );
  }

  private mapMangaToProduct(manga: any): Product {
    return {
      id: manga.id,
      title: manga.title,
      type: 'manga',
      image: manga.coverImage || 'assets/placeholder.png',
      price: manga.price,
      discountPrice: manga.discountPrice,
      description: manga.description || '',
      category: [manga.category],
      inStock: manga.stock > 0,
      quantity: manga.stock || 0,
      rating: manga.rating || 0,
      reviews: manga.reviews || 0,
      publisher: manga.publisher,
      format: manga.format
    };
  }
}