import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MangaService, Manga } from '../../../../core/services/manga.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [MangaService],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  trendingManga: Manga[] = [];
  latestUpdates: Manga[] = [];
  isLoadingTrending = true;
  isLoadingLatest = true;
  error: string | null = null;

  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    this.loadTrendingManga();
    this.loadLatestUpdates();
  }

  private loadTrendingManga(): void {
    this.isLoadingTrending = true;
    this.mangaService.getTrendingManga().subscribe({
      next: (manga) => {
        this.trendingManga = manga;
        this.isLoadingTrending = false;
      },
      error: (error) => {
        this.error = 'Failed to load trending manga';
        this.isLoadingTrending = false;
        console.error('Error loading trending manga:', error);
      }
    });
  }

  private loadLatestUpdates(): void {
    this.isLoadingLatest = true;
    this.mangaService.getLatestUpdates().subscribe({
      next: (manga) => {
        this.latestUpdates = manga;
        this.isLoadingLatest = false;
      },
      error: (error) => {
        this.error = 'Failed to load latest updates';
        this.isLoadingLatest = false;
        console.error('Error loading latest updates:', error);
      }
    });
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/350x500/2A2A2A/6600FF?text=MANGA+STORE';
  }

  onImageLoad(event: any): void {
    event.target.classList.remove('loading');
  }

  getTotalManga(): number {
    return this.trendingManga.length + this.latestUpdates.length;
  }

  getUniqueGenres(): number {
    const allGenres = new Set(
      [...this.trendingManga, ...this.latestUpdates]
        .flatMap(manga => manga.genres)
    );
    return allGenres.size;
  }

  getUpdatedToday(): number {
    const today = new Date().toDateString();
    return this.latestUpdates.filter(manga => 
      new Date(manga.updatedAt).toDateString() === today
    ).length;
  }

  getFeaturedManga(): any[] {
    return this.trendingManga
      .filter(manga => manga.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }
}
