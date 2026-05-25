import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TrainingService } from '../services/training.service';
import { BaseTraining } from '../models/base-training';

@Component({
  selector: 'app-mi-actividad',
  standalone: true,
  templateUrl: './mi-actividad.html',
})
export class MiActividadComponent extends BaseTraining {
  protected auth = inject(AuthService);
  protected training = inject(TrainingService);

  // Mes mostrado (Abril 2026 por defecto)
  private year = signal(2026);
  private month = signal(3);

  readonly weeks = computed(() => this.training.buildWeeks(this.year(), this.month()));
  readonly stats = computed(() => this.training.monthStats(this.year(), this.month()));
  readonly monthLabel = computed(() => `${this.training.monthsFull[this.month()]} ${this.year()}`);
  readonly monthShort = computed(() => `${this.training.monthsShort[this.month()]} ${this.year()}`);
  readonly scale = this.training.intensityScale;

  readonly goalLabel = computed(() => {
    const g = this.auth.user()?.goal;
    return g ? this.auth.goalLabel(g) : 'Recomposición';
  });

  prevMonth(): void {
    let m = this.month() - 1, y = this.year();
    if (m < 0) { m = 11; y--; }
    this.month.set(m); this.year.set(y);
  }
  nextMonth(): void {
    let m = this.month() + 1, y = this.year();
    if (m > 11) { m = 0; y++; }
    this.month.set(m); this.year.set(y);
  }

  cellTitle(day: number | null, minutes: number): string {
    if (!day) return '';
    return `${day} ${this.training.monthsFull[this.month()]} · ${minutes} min`;
  }
}
