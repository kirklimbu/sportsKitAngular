import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TournamentService } from '../data/tournament.service';

@Component({
  selector: 'app-view-tiesheet',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  templateUrl: './view-tiesheet.html',
  styleUrl: './view-tiesheet.scss',
})
export class ViewTiesheet implements OnInit {
  tiesheetPath = '';
  private readonly tournamentService = inject(TournamentService);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.fetchTiesheetPath();
  }

  private fetchTiesheetPath(): void {
    this.tournamentService
      .getTiesheetPdf()
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((res: any) => {
        if (res?.tiesheetPath) {
          this.tiesheetPath = res.tiesheetPath;
        }
      });
  }

  /** Force download PDF even if server blocks direct link */
  downloadTiesheet(): void {
    if (!this.tiesheetPath) return;

    this.http
      .get(this.tiesheetPath, { responseType: 'blob' })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.tiesheetPath.split('/').pop() || 'tiesheet.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  /** Open PDF in new tab */
  previewTiesheet(): void {
    if (!this.tiesheetPath) return;
    window.open(this.tiesheetPath, '_blank');
  }
}
