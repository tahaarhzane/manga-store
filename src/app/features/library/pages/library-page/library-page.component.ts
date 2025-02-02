import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="library-page">
      <div class="library-header">
        <h1>My Library</h1>
        <p class="empty-message" *ngIf="!hasBooks">
          Your library is empty. Start adding manga to your collection!
        </p>
      </div>

      <!-- TODO: Implement library functionality -->
      <div class="cta-section">
        <button mat-raised-button color="primary" routerLink="/browse">
          <mat-icon>add</mat-icon>
          Add Manga to Library
        </button>
      </div>
    </div>
  `,
  styles: [`
    .library-page {
      padding: 2rem 1rem;
      max-width: 1200px;
      margin: 56px auto 0;
      min-height: calc(100vh - 56px);
      color: #ffffff;
    }

    .library-header {
      margin-bottom: 2rem;
      text-align: center;

      h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .empty-message {
        color: #666666;
        font-size: 1.1rem;
      }
    }

    .cta-section {
      display: flex;
      justify-content: center;
      margin-top: 2rem;

      button {
        background-color: #6600ff;
        padding: 0.5rem 1.5rem;

        mat-icon {
          margin-right: 0.5rem;
        }

        &:hover {
          background-color: #7f1fff;
        }
      }
    }
  `]
})
export class LibraryPageComponent {
  hasBooks = false; // TODO: Implement library state management
} 