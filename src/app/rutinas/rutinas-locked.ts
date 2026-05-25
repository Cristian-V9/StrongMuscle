import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-rutinas-locked',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './rutinas-locked.html',
  styleUrl: './rutinas-locked.css',
})
export class RutinasLockedComponent {
  private training = inject(TrainingService);
  readonly demoDay = this.training.week[0];
  readonly week = this.training.week;

  imgSrc(illust: string): string {
    return `assets/exercises/${illust}.png`;
  }
  onImgError(ev: Event): void {
    (ev.target as HTMLImageElement).style.display = 'none';
  }
}