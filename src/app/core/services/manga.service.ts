import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Manga {
  id: number;
  title: string;
  cover: string;
  rating: number;
  genres: string[];
  latestChapter: string;
  updatedAt: string;
  status: string;
}

export interface MangaDetail extends Manga {
  summary: string;
  author: string;
  artist: string;
  releaseYear: number;
  chapters: Chapter[];
}

export interface Chapter {
  number: string;
  title: string;
  releaseDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private mockManga: MangaDetail[] = [
    {
      id: 1,
      title: 'Chainsaw Man',
      cover: 'https://cdn.myanimelist.net/images/manga/2/257709.jpg',
      rating: 4.7,
      genres: ['Action', 'Horror', 'Supernatural'],
      latestChapter: 'Chapter 118',
      updatedAt: '2024-03-15',
      status: 'Ongoing',
      summary: 'Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita.',
      author: 'Tatsuki Fujimoto',
      artist: 'Tatsuki Fujimoto',
      releaseYear: 2018,
      chapters: [
        { number: 'Chapter 118', title: 'The Weapon Devil', releaseDate: '2024-03-15' },
        { number: 'Chapter 117', title: 'Endless Battle', releaseDate: '2024-03-08' },
        { number: 'Chapter 116', title: 'The Truth', releaseDate: '2024-02-29' }
      ]
    },
    {
      id: 2,
      title: 'One Piece',
      cover: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
      rating: 4.9,
      genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
      latestChapter: 'Chapter 1108',
      updatedAt: '2024-03-14',
      status: 'Ongoing',
      summary: 'Gol D. Roger, the King of the Pirates, achieved everything this world has to offer. Before his death, his final words drove countless souls to the seas. Thus began the Great Age of Pirates...',
      author: 'Eiichiro Oda',
      artist: 'Eiichiro Oda',
      releaseYear: 1997,
      chapters: [
        { number: 'Chapter 1108', title: 'The New Era', releaseDate: '2024-03-14' },
        { number: 'Chapter 1107', title: 'Dawn', releaseDate: '2024-03-07' },
        { number: 'Chapter 1106', title: 'Legacy', releaseDate: '2024-02-29' }
      ]
    },
    {
      id: 3,
      title: 'Demon Slayer',
      cover: 'https://cdn.myanimelist.net/images/manga/3/179023.jpg',
      rating: 4.8,
      genres: ['Action', 'Supernatural', 'Historical'],
      latestChapter: 'Chapter 205',
      updatedAt: '2024-03-13',
      status: 'Completed',
      summary: 'Tanjiro Kamado is a kind-hearted boy who sells charcoal for a living. His peaceful life is shattered when demons slaughter his entire family. His determination leads him to become a demon slayer to avenge his family and cure his sister.',
      author: 'Koyoharu Gotouge',
      artist: 'Koyoharu Gotouge',
      releaseYear: 2016,
      chapters: [
        { number: 'Chapter 205', title: 'Life Shining Across the Years', releaseDate: '2024-03-13' },
        { number: 'Chapter 204', title: 'The Sun', releaseDate: '2024-03-06' },
        { number: 'Chapter 203', title: 'Dawn', releaseDate: '2024-02-28' }
      ]
    },
    {
      id: 4,
      title: 'My Hero Academia',
      cover: 'https://cdn.myanimelist.net/images/manga/1/209370.jpg',
      rating: 4.6,
      genres: ['Action', 'Superhero', 'School Life'],
      latestChapter: 'Chapter 420',
      updatedAt: '2024-03-12',
      status: 'Ongoing',
      summary: 'In a world where 80% of the population has superpowers, Izuku Midoriya is born without them. However, his dream of becoming a hero leads him to inherit a power from the world\'s greatest hero, All Might.',
      author: 'Kohei Horikoshi',
      artist: 'Kohei Horikoshi',
      releaseYear: 2014,
      chapters: [
        { number: 'Chapter 420', title: 'The Final Stand', releaseDate: '2024-03-12' },
        { number: 'Chapter 419', title: 'Heroes', releaseDate: '2024-03-05' },
        { number: 'Chapter 418', title: 'Beyond', releaseDate: '2024-02-27' }
      ]
    },
    {
      id: 5,
      title: 'Black Clover',
      cover: 'https://cdn.myanimelist.net/images/manga/2/166124.jpg',
      rating: 4.5,
      genres: ['Action', 'Fantasy', 'Magic'],
      latestChapter: 'Chapter 368',
      updatedAt: '2024-03-11',
      status: 'Ongoing',
      summary: 'In a world where magic is everything, Asta is born without any magic power. However, his determination and anti-magic sword lead him on a journey to become the Wizard King.',
      author: 'Yuki Tabata',
      artist: 'Yuki Tabata',
      releaseYear: 2015,
      chapters: [
        { number: 'Chapter 368', title: 'Magic Emperor', releaseDate: '2024-03-11' },
        { number: 'Chapter 367', title: 'United Front', releaseDate: '2024-03-04' },
        { number: 'Chapter 366', title: 'Beyond Limits', releaseDate: '2024-02-26' }
      ]
    }
  ];

  getTrendingManga(): Observable<Manga[]> {
    return of(this.mockManga.map(manga => ({
      id: manga.id,
      title: manga.title,
      cover: manga.cover,
      rating: manga.rating,
      genres: manga.genres,
      latestChapter: manga.latestChapter,
      updatedAt: manga.updatedAt,
      status: manga.status
    }))).pipe(delay(800)); // Simulate network delay
  }

  getLatestUpdates(): Observable<Manga[]> {
    return of(this.mockManga.map(manga => ({
      id: manga.id,
      title: manga.title,
      cover: manga.cover,
      rating: manga.rating,
      genres: manga.genres,
      latestChapter: manga.latestChapter,
      updatedAt: manga.updatedAt,
      status: manga.status
    })).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())).pipe(delay(800));
  }

  getMangaById(id: number): Observable<MangaDetail | undefined> {
    return of(this.mockManga.find(manga => manga.id === id)).pipe(delay(800));
  }

  searchManga(query: string): Observable<Manga[]> {
    const normalizedQuery = query.toLowerCase();
    return of(this.mockManga
      .filter(manga => 
        manga.title.toLowerCase().includes(normalizedQuery) ||
        manga.genres.some(genre => genre.toLowerCase().includes(normalizedQuery))
      )
      .map(manga => ({
        id: manga.id,
        title: manga.title,
        cover: manga.cover,
        rating: manga.rating,
        genres: manga.genres,
        latestChapter: manga.latestChapter,
        updatedAt: manga.updatedAt,
        status: manga.status
      }))
    ).pipe(delay(800));
  }
} 