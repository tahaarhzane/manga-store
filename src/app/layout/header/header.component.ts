import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';

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
    MatFormFieldModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Register custom SVG icons
    this.matIconRegistry.addSvgIcon(
      'twitter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'telegram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/telegram.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'reddit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/reddit.svg')
    );
  }

  ngOnInit(): void {}

  onSearch(): void {
    // TODO: Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }
}
