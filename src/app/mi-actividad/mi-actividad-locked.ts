import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../services/training.service';
import { HeatCell } from '../models/heatmap.model';

@Component({
  selector: 'app-mi-actividad-locked',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mi-actividad-locked.html',
  styleUrl: './mi-actividad-locked.css',
})
export class MiActividadLockedComponent implements OnInit, OnDestroy {
  private training = inject(TrainingService);

  readonly scale = this.training.intensityScale;
  weeks = signal<HeatCell[][]>([]);

  private timer?: ReturnType<typeof setInterval>;
  private readonly levels: HeatCell['level'][] = ['low', 'mod', 'rec', 'high', 'crit', 'mod', 'rec', 'low'];

  ngOnInit(): void {
    this.weeks.set(this.training.buildWeeks(2026, 3));
    this.timer = setInterval(() => this.shuffle(), 2200);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private shuffle(): void {
    this.weeks.update(weeks =>
      weeks.map(row =>
        row.map(cell => {
          if (cell.day === null || cell.level === 'empty') return cell;
          const next = this.levels[Math.floor(Math.random() * this.levels.length)];
          return { ...cell, level: next };
        })
      )
    );
  }
}