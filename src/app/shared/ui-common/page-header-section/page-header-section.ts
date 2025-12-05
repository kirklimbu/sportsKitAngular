import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-header-section',
  imports: [CommonModule],
  templateUrl: './page-header-section.html',
  styleUrl: './page-header-section.scss',
})
export class PageHeaderSectionComponent  {
  title = input<string | null>(null);
  subtitle = input<string | null>(null);
  description = input<string | null>(null);
  theme = input<'light' | 'dark'>('light');
}
