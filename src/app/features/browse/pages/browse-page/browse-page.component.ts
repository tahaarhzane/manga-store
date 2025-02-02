import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MangaService, Manga } from '../../../../core/services/manga.service';

@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule
  ],
  template: `
    <div class="browse-page">
      <div class="filters-section">
        <h2>Browse Manga</h2>
        <div class="filters">
          <mat-form-field appearance="outline">
            <mat-label>Sort By</mat-label>
            <mat-select [(ngModel)]="sortBy" (selectionChange)="applyFilters()">
              <mat-option value="rating">Rating</mat-option>
              <mat-option value="latest">Latest Updates</mat-option>
              <mat-option value="title">Title</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="statusFilter" (selectionChange)="applyFilters()">
              <mat-option value="all">All</mat-option>
              <mat-option value="ongoing">Ongoing</mat-option>
              <mat-option value="completed">Completed</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Genres</mat-label>
            <mat-select [(ngModel)]="selectedGenres" multiple (selectionChange)="applyFilters()">
              <mat-option *ngFor="let genre of availableGenres" [value]="genre">
                {{ genre }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="manga-grid">
        <mat-card class="manga-card" *ngFor="let manga of filteredManga" [routerLink]="['/manga', manga.id]">
          <img mat-card-image [src]="manga.cover" [alt]="manga.title" class="manga-cover"
               (error)="onImageError($event)"
               (load)="onImageLoad($event)"
               [class.loading]="true">
          <mat-card-content>
            <h3 class="manga-title">{{ manga.title }}</h3>
            <div class="manga-info">
              <span class="rating">
                <mat-icon>star</mat-icon>
                {{ manga.rating }}
              </span>
              <span class="chapter">{{ manga.latestChapter }}</span>
            </div>
            <div class="genres">
              <span class="genre" *ngFor="let genre of manga.genres.slice(0, 2)">{{ genre }}</span>
            </div>
            <div class="update-time">
              Updated {{ manga.updatedAt }}
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .browse-page {
      padding: 2rem 1rem;
      max-width: 1200px;
      margin: 56px auto 0;
      min-height: calc(100vh - 56px);
    }

    .filters-section {
      margin-bottom: 2rem;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 1rem;
      }

      .filters {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        mat-form-field {
          min-width: 200px;
          
          ::ng-deep {
            .mat-mdc-form-field-flex {
              background-color: rgba(255, 255, 255, 0.1);
            }

            .mat-mdc-form-field-outline {
              color: rgba(255, 255, 255, 0.2);
            }

            .mat-mdc-text-field-wrapper {
              background-color: transparent;
            }

            .mat-mdc-select-value-text {
              color: #ffffff;
            }

            .mat-mdc-select-arrow {
              color: #ffffff;
            }
          }
        }
      }
    }

    .manga-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1.25rem;
    }

    .manga-card {
      background-color: #1a1a1a;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;

      &:hover {
        transform: translateY(-4px) translateZ(0);
        box-shadow: 0 4px 20px rgba(102, 0, 255, 0.2);
      }

      .manga-cover {
        width: 100%;
        height: 240px;
        object-fit: cover;
        background-color: #2A2A2A;
        transition: opacity 0.3s ease;

        &.loading {
          opacity: 0;
        }
      }

      mat-card-content {
        padding: 0.75rem;

        .manga-title {
          font-size: 1rem;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .manga-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;

          .rating {
            display: flex;
            align-items: center;
            color: #ffd700;
            font-weight: 500;
            font-size: 0.9rem;

            mat-icon {
              font-size: 1rem;
              width: 1rem;
              height: 1rem;
              margin-right: 0.25rem;
            }
          }

          .chapter {
            color: #6600ff;
            font-size: 0.85rem;
            font-weight: 500;
          }
        }

        .genres {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;

          .genre {
            background-color: rgba(102, 0, 255, 0.15);
            color: #6600ff;
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            font-size: 0.75rem;
            font-weight: 500;
          }
        }

        .update-time {
          color: #666666;
          font-size: 0.75rem;
        }
      }
    }

    @media (max-width: 768px) {
      .filters {
        flex-direction: column;

        mat-form-field {
          width: 100%;
        }
      }

      .manga-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }

      .manga-card {
        .manga-cover {
          height: 200px;
        }
      }
    }
  `]
})
export class BrowsePageComponent implements OnInit {
  allManga: Manga[] = [];
  filteredManga: Manga[] = [];
  sortBy = 'rating';
  statusFilter = 'all';
  selectedGenres: string[] = [];
  availableGenres: string[] = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Magic', 'School Life', 'Supernatural'
  ];

  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    this.loadManga();
  }

  private loadManga(): void {
    this.mangaService.getTrendingManga().subscribe(manga => {
      this.allManga = manga;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.allManga];

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(manga => 
        manga.status?.toLowerCase() === this.statusFilter
      );
    }

    // Apply genre filter
    if (this.selectedGenres.length > 0) {
      filtered = filtered.filter(manga =>
        this.selectedGenres.every(genre => manga.genres.includes(genre))
      );
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        filtered.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredManga = filtered;
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/350x500/2A2A2A/6600FF?text=MANGA+STORE';
  }

  onImageLoad(event: any): void {
    event.target.classList.remove('loading');
  }
} 