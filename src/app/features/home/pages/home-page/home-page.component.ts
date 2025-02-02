import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface Manga {
  id: number;
  title: string;
  cover: string;
  price: number;
  rating: number;
  categories: string[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private slideInterval?: number;
  currentSlideIndex = 0;

  featuredManga: Manga[] = [
    {
      id: 1,
      title: 'One Piece',
      cover: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
      price: 9.99,
      rating: 4.8,
      categories: ['Action', 'Adventure', 'Comedy']
    },
    {
      id: 2,
      title: 'Attack on Titan',
      cover: 'https://cdn.myanimelist.net/images/manga/3/249658.jpg',
      price: 12.99,
      rating: 4.9,
      categories: ['Action', 'Drama', 'Fantasy']
    },
    {
      id: 3,
      title: 'Demon Slayer',
      cover: 'https://cdn.myanimelist.net/images/manga/3/179023.jpg',
      price: 10.99,
      rating: 4.7,
      categories: ['Action', 'Supernatural']
    }
  ];

  trendingManga: Manga[] = [
    {
      id: 4,
      title: 'Jujutsu Kaisen',
      cover: 'https://cdn.myanimelist.net/images/manga/3/213811.jpg',
      price: 11.99,
      rating: 4.6,
      categories: ['Action', 'Supernatural']
    },
    {
      id: 5,
      title: 'Chainsaw Man',
      cover: 'https://cdn.myanimelist.net/images/manga/3/216464.jpg',
      price: 13.99,
      rating: 4.7,
      categories: ['Action', 'Horror']
    },
    {
      id: 6,
      title: 'My Hero Academia',
      cover: 'https://cdn.myanimelist.net/images/manga/1/209370.jpg',
      price: 9.99,
      rating: 4.5,
      categories: ['Action', 'Superhero']
    }
  ];

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideshow(): void {
    this.slideInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  previousSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideshow();
    }
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.featuredManga.length - 1 
      : this.currentSlideIndex - 1;
  }

  nextSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideshow();
    }
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.featuredManga.length;
  }

  selectSlide(index: number): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideshow();
    }
    this.currentSlideIndex = index;
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder.jpg';
  }
}
