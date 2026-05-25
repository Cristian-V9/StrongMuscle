import { Component, inject, signal } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { DayRoutine } from '../models/exercise.model';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  templateUrl: './rutinas.html',
  styleUrl: './rutinas.css',
})
export class RutinasComponent {
  private training = inject(TrainingService);

  readonly week = this.training.week;
  readonly activeId = signal<string>('lun');

  get activeDay(): DayRoutine {
    return this.week.find(d => d.id === this.activeId())!;
  }

  select(id: string): void {
    this.activeId.set(id);
  }

  imgSrc(illust: string): string {
    return `assets/exercises/${illust}.png`;
  }

  onImgError(ev: Event): void {
    (ev.target as HTMLImageElement).style.display = 'none';
  }
}