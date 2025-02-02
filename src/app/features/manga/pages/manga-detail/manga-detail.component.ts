import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MangaService, MangaDetail } from '../../../../core/services/manga.service';

@Component({
  selector: 'app-manga-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent implements OnInit {
  mangaId!: number;
  manga?: MangaDetail;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    this.mangaId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.mangaId)) {
      this.router.navigate(['/']);
      return;
    }

    this.loadMangaDetails(this.mangaId);
  }

  private loadMangaDetails(id: number): void {
    this.isLoading = true;
    this.error = null;
    
    this.mangaService.getMangaById(id).subscribe({
      next: (manga) => {
        if (manga) {
          this.manga = manga;
          this.isLoading = false;
        } else {
          this.error = 'Manga not found';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/home']), 2000);
        }
      },
      error: (error) => {
        this.error = 'Failed to load manga details';
        this.isLoading = false;
        console.error('Error loading manga details:', error);
        setTimeout(() => this.router.navigate(['/home']), 2000);
      }
    });
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/350x500/2A2A2A/6600FF?text=MANGA+STORE';
  }
} 