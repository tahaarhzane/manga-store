import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MangaService, Manga } from '../../services/manga.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar class="header">
      <div class="header-content">
        <div class="left-section">
          <a routerLink="/home" class="logo">
            <mat-icon>menu_book</mat-icon>
            <span>Manga Store</span>
          </a>
          <nav class="nav-links">
            <a mat-button routerLink="/browse">Browse</a>
            <a mat-button routerLink="/shop">Shop</a>
            <a mat-button routerLink="/library">Library</a>
          </nav>
        </div>
        
        <div class="search-section">
          <div class="search-container">
            <input 
              type="text" 
              placeholder="Search manga..." 
              [(ngModel)]="searchQuery"
              (keyup.enter)="onSearch()">
            <button class="search-button" (click)="onSearch()">
              <mat-icon>search</mat-icon>
            </button>
          </div>
        </div>

        <div class="right-section">
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/auth/login" *ngIf="!isLoggedIn">
              <mat-icon>login</mat-icon>
              <span>Login</span>
            </button>
            <button mat-menu-item routerLink="/auth/register" *ngIf="!isLoggedIn">
              <mat-icon>person_add</mat-icon>
              <span>Register</span>
            </button>
            <ng-container *ngIf="isLoggedIn">
              <button mat-menu-item routerLink="/profile">
                <mat-icon>person</mat-icon>
                <span>Profile</span>
              </button>
              <button mat-menu-item routerLink="/settings">
                <mat-icon>settings</mat-icon>
                <span>Settings</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
                <mat-icon>exit_to_app</mat-icon>
                <span>Logout</span>
              </button>
            </ng-container>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: #1a1a1a;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0;
      height: 56px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 2rem;

      .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.2rem;

        mat-icon {
          color: #6600ff;
        }
      }

      .nav-links {
        display: flex;
        gap: 1rem;

        a {
          color: #ffffff;
          opacity: 0.8;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .search-section {
      flex: 1;
      max-width: 400px;
      margin: 0 2rem;

      .search-container {
        display: flex;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        padding: 0.5rem 1rem;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        input {
          flex: 1;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
          padding: 0;

          &::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        }

        .search-button {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin-left: 0.5rem;

          mat-icon {
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 1rem;

      button {
        color: #ffffff;
        opacity: 0.8;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 1;
        }
      }
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none !important;
      }

      .search-section {
        margin: 0 1rem;
      }
    }
  `]
})
export class HeaderComponent {
  searchQuery = '';
  searchResults: Manga[] = [];
  isLoggedIn = false; // TODO: Implement auth state management
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private mangaService: MangaService
  ) {
    this.setupSearch();
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onMangaSelect(manga: Manga): void {
    this.router.navigate(['/manga', manga.id]);
    this.searchQuery = '';
    this.searchResults = [];
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.mangaService.searchManga(query))
    ).subscribe(results => {
      this.searchResults = results.slice(0, 5); // Show only top 5 results
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/shop'], {
        queryParams: { search: this.searchQuery.trim() }
      });
      this.searchQuery = ''; // Clear search after navigation
    }
  }

  logout(): void {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
    this.isLoggedIn = false;
  }
}