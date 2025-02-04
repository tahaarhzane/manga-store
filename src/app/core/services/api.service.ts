import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMaxPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/mangas/max-price`).pipe(
      tap(maxPrice => console.log('Max price:', maxPrice))
    );
  }
  getMangas(
    page: number = 0,
    size: number = 12,
    sort: string = 'title',
    filter?: {
      category?: string;
      inStock?: boolean;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
    }
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (filter) {
      // Map search query to keyword parameter
      if (filter.search) {
        params = params.append('keyword', filter.search);
      }
      // Handle categories as array
      if (filter.category) {
        params = params.append('categories', filter.category);
      }
      if (filter.inStock !== undefined) {
        params = params.append('inStock', filter.inStock.toString());
      }
      if (filter.minPrice !== undefined) {
        params = params.append('minPrice', filter.minPrice.toString());
      }
      if (filter.maxPrice !== undefined) {
        params = params.append('maxPrice', filter.maxPrice.toString());
      }
    }

    // Use search endpoint for all queries
    return this.http.get(`${this.baseUrl}/mangas/search`, { params }).pipe(
      tap(response => console.log('Search Response:', response))
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/mangas/categories`);
  }
}