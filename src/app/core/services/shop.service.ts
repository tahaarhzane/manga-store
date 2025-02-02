import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

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
  releaseDate: string;
  publisher: string;
  language: string;
  format: string;
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
  private mockProducts: Product[] = [
    {
      id: 1,
      title: 'Chainsaw Man Vol. 1',
      type: 'manga',
      image: 'https://cdn.myanimelist.net/images/manga/2/257709.jpg',
      price: 9.99,
      description: "Denji is a poor young man who'll do anything for money, even hunting down devils with his pet devil Pochita.",
      category: ['Action', 'Horror', 'Supernatural'],
      inStock: true,
      quantity: 50,
      rating: 4.8,
      reviews: 128,
      releaseDate: '2024-01-15',
      publisher: 'VIZ Media',
      language: 'English',
      format: 'Paperback'
    },
    {
      id: 2,
      title: "One Piece Vol. 100 Collector's Edition",
      type: 'manga',
      image: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
      price: 24.99,
      discountPrice: 19.99,
      description: "Special collector's edition of the 100th volume featuring exclusive artwork and bonus content.",
      category: ['Action', 'Adventure', 'Fantasy'],
      inStock: true,
      quantity: 25,
      rating: 4.9,
      reviews: 256,
      releaseDate: '2024-02-01',
      publisher: 'VIZ Media',
      language: 'English',
      format: 'Hardcover'
    },
    {
      id: 3,
      title: 'Demon Slayer Complete Box Set',
      type: 'manga',
      image: 'https://cdn.myanimelist.net/images/manga/3/179023.jpg',
      price: 199.99,
      discountPrice: 159.99,
      description: 'Complete collection of Demon Slayer manga volumes in a premium box set with exclusive poster.',
      category: ['Action', 'Supernatural', 'Historical'],
      inStock: true,
      quantity: 10,
      rating: 4.9,
      reviews: 512,
      releaseDate: '2024-01-30',
      publisher: 'VIZ Media',
      language: 'English',
      format: 'Box Set'
    },
    {
      id: 4,
      title: 'My Hero Academia Deku Figure',
      type: 'merchandise',
      image: 'https://cdn.myanimelist.net/images/manga/1/209370.jpg',
      price: 59.99,
      description: 'High-quality PVC figure of Izuku Midoriya in his hero costume.',
      category: ['Figures', 'Collectibles'],
      inStock: true,
      quantity: 15,
      rating: 4.7,
      reviews: 89,
      releaseDate: '2024-02-15',
      publisher: 'Good Smile Company',
      language: 'N/A',
      format: 'Figure'
    },
    {
      id: 5,
      title: 'Black Clover Vol. 1-3 Bundle',
      type: 'manga',
      image: 'https://cdn.myanimelist.net/images/manga/2/166124.jpg',
      price: 29.97,
      discountPrice: 24.99,
      description: 'Start your Black Clover collection with the first three volumes at a special price.',
      category: ['Action', 'Fantasy', 'Magic'],
      inStock: true,
      quantity: 30,
      rating: 4.6,
      reviews: 167,
      releaseDate: '2024-01-20',
      publisher: 'VIZ Media',
      language: 'English',
      format: 'Paperback Bundle'
    },
    {
      id: 6,
      title: 'Attack on Titan Levi Keychain',
      type: 'merchandise',
      image: 'https://example.com/aot-keychain.jpg',
      price: 12.99,
      description: 'Metal keychain featuring Levi Ackerman from Attack on Titan.',
      category: ['Accessories', 'Collectibles'],
      inStock: true,
      quantity: 100,
      rating: 4.5,
      reviews: 45,
      releaseDate: '2024-02-10',
      publisher: 'Great Eastern',
      language: 'N/A',
      format: 'Keychain'
    },
    {
      id: 7,
      title: 'Jujutsu Kaisen Vol. 1 Special Edition',
      type: 'manga',
      image: 'https://example.com/jjk-special.jpg',
      price: 14.99,
      description: 'Special edition of Jujutsu Kaisen Vol. 1 with exclusive cover art.',
      category: ['Action', 'Supernatural', 'School Life'],
      inStock: false,
      quantity: 0,
      rating: 4.8,
      reviews: 203,
      releaseDate: '2024-02-20',
      publisher: 'VIZ Media',
      language: 'English',
      format: 'Paperback'
    },
    {
      id: 8,
      title: 'Naruto Shippuden Headband',
      type: 'merchandise',
      image: 'https://example.com/naruto-headband.jpg',
      price: 19.99,
      discountPrice: 15.99,
      description: 'Official Naruto Shippuden Hidden Leaf Village metal headband.',
      category: ['Accessories', 'Cosplay'],
      inStock: true,
      quantity: 75,
      rating: 4.6,
      reviews: 312,
      releaseDate: '2024-01-25',
      publisher: 'Great Eastern',
      language: 'N/A',
      format: 'Accessory'
    }
  ];

  getProducts(
    page: number = 1,
    pageSize: number = 12,
    sort: string = 'newest',
    filter?: { type?: string; category?: string; inStock?: boolean; minPrice?: number; maxPrice?: number }
  ): Observable<PaginatedProducts> {
    let filtered = [...this.mockProducts];

    // Apply filters
    if (filter) {
      if (filter.type) {
        filtered = filtered.filter(product => product.type === filter.type);
      }
      if (filter.category) {
        filtered = filtered.filter(product => product.category.includes(filter.category || ''));
      }
      if (filter.inStock !== undefined) {
        filtered = filtered.filter(product => product.inStock === filter.inStock);
      }
      if (filter.minPrice !== undefined) {
        filtered = filtered.filter(product => 
          (product.discountPrice || product.price) >= (filter.minPrice || 0)
        );
      }
      if (filter.maxPrice !== undefined) {
        filtered = filtered.filter(product => 
          (product.discountPrice || product.price) <= (filter.maxPrice || Infinity)
        );
      }
    }

    // Apply sorting
    switch (sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);

    return of({
      items,
      total,
      page,
      pageSize,
      totalPages
    }).pipe(delay(800)); // Simulate network delay
  }

  getCategories(): Observable<string[]> {
    const categories = Array.from(
      new Set(
        this.mockProducts.flatMap(product => product.category)
      )
    ).sort();
    return of(categories).pipe(delay(500));
  }

  getProductTypes(): Observable<string[]> {
    const types = Array.from(
      new Set(
        this.mockProducts.map(product => product.type)
      )
    ).sort();
    return of(types).pipe(delay(500));
  }
} 