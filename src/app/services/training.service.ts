import { Injectable } from '@angular/core';
import { DayRoutine } from '../models/exercise.model';
import { HeatCell, IntensityScale } from '../models/heatmap.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  readonly monthsFull = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  readonly monthsShort = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];

  readonly intensityScale: IntensityScale[] = [
    { level: 'empty', cssClass: 'sm-cell__inner--empty', label: 'Sin actividad', minutes: '0 min' },
    { level: 'low',   cssClass: 'sm-cell__inner--low',   label: 'Baja',          minutes: '< 30 min' },
    { level: 'mod',   cssClass: 'sm-cell__inner--mod',   label: 'Moderada',      minutes: '30 — 60 min' },
    { level: 'rec',   cssClass: 'sm-cell__inner--rec',   label: 'Recomendada',   minutes: '60 — 90 min' },
    { level: 'high',  cssClass: 'sm-cell__inner--high',  label: 'Excesiva',      minutes: '90 — 120 min' },
    { level: 'crit',  cssClass: 'sm-cell__inner--crit',  label: 'Crítica',       minutes: '> 120 min' },
  ];

   /** Plan semanal completo. Mock data por ahora — luego vendrá de la DB. */
  readonly week: DayRoutine[] = [
    {
      id: 'lun', day: 'Lunes', label: 'Lun', type: 'Push Day', focus: 'Pecho · Hombro · Tríceps',
      exercises: [
        { code: 'A1', name: 'Press inclinado',      muscles: 'Pecho, Tríceps',          sets: '4 × 8-10',  illust: 'bench' },
        { code: 'A2', name: 'Aperturas de pecho',   muscles: 'Pecho, Deltoide anterior', sets: '3 × 12',    illust: 'pec-deck' },
        { code: 'A3', name: 'Press militar',        muscles: 'Hombro, Tríceps',         sets: '4 × 8',     illust: 'press' },
        { code: 'B1', name: 'Elevación lateral',    muscles: 'Hombros',                 sets: '3 × 12-15', illust: 'lateral' },
        { code: 'B2', name: 'Extensión de tríceps', muscles: 'Tríceps',                 sets: '3 × 12',    illust: 'tricep' },
        { code: 'B3', name: 'Triceps polea alta',   muscles: 'Tríceps, Hombros',        sets: '3 × 10',    illust: 'tricep2' },
      ],
    },
    {
      id: 'mar', day: 'Martes', label: 'Mar', type: 'Pull Day', focus: 'Espalda · Bíceps',
      exercises: [
        { code: 'A1', name: 'Jalón neutro',    muscles: 'Dorsales, Bíceps',        sets: '4 × 10', illust: 'pulldown' },
        { code: 'A2', name: 'Jalón abierto',   muscles: 'Dorsales, Bíceps',        sets: '4 × 10', illust: 'pulldown2' },
        { code: 'A3', name: 'Remo abierto',    muscles: 'Espalda alta, Antebrazo', sets: '4 × 12', illust: 'row' },
        { code: 'B1', name: 'Pull over',       muscles: 'Dorsales',                sets: '3 × 12', illust: 'pullover' },
        { code: 'B2', name: 'Curl predicador', muscles: 'Bíceps, Antebrazo',       sets: '3 × 10', illust: 'preacher' },
        { code: 'B3', name: 'Curl supino',     muscles: 'Bíceps, Antebrazo',       sets: '3 × 12', illust: 'curl' },
      ],
    },
    {
      id: 'mie', day: 'Miércoles', label: 'Mié', type: 'Leg Day', focus: 'Cuádriceps · Glúteo',
      exercises: [
        { code: 'A1', name: 'Hack squat',     muscles: 'Cuádriceps, Glúteo',  sets: '4 × 8-10', illust: 'squat' },
        { code: 'A2', name: 'Prensa',         muscles: 'Cuádriceps, Glúteo',  sets: '4 × 12',   illust: 'press2' },
        { code: 'A3', name: 'Extensiones',    muscles: 'Cuádriceps',          sets: '3 × 15',   illust: 'extension' },
        { code: 'B1', name: 'Aducción',       muscles: 'Aductores',           sets: '3 × 15',   illust: 'adduction' },
        { code: 'B2', name: 'Gemelos parado', muscles: 'Gemelos',             sets: '4 × 15',   illust: 'calf' },
        { code: 'B3', name: 'Hip thrust',     muscles: 'Glúteos, Cuádriceps', sets: '4 × 10',   illust: 'thrust' },
      ],
    },
    {
      id: 'jue', day: 'Jueves', label: 'Jue', type: 'Upper Push', focus: 'Pecho · Hombro',
      exercises: [
        { code: 'A1', name: 'Press plano',              muscles: 'Pecho, Tríceps',      sets: '4 × 6-8', illust: 'bench' },
         { code: 'A2', name: 'Aperturas de pecho',   muscles: 'Pecho, Deltoide anterior', sets: '3 × 12',    illust: 'pec-deck' },
        { code: 'A1', name: 'Jalón neutro',    muscles: 'Dorsales, Bíceps',        sets: '4 × 10', illust: 'pulldown' },
        { code: 'A3', name: 'Remo abierto',    muscles: 'Espalda alta, Antebrazo', sets: '4 × 12', illust: 'row' },
        { code: 'B1', name: 'Elevación lateral',    muscles: 'Hombros',                 sets: '3 × 12-15', illust: 'lateral' },
        { code: 'A3', name: 'Press militar',        muscles: 'Hombro, Tríceps',         sets: '4 × 8',     illust: 'press' },
      ],
    },
    {
      id: 'vie', day: 'Viernes', label: 'Vie', type: 'Pull Power', focus: 'Espalda · Bíceps',
      exercises: [
       { code: 'A1', name: 'Hack squat',     muscles: 'Cuádriceps, Glúteo',  sets: '4 × 8-10', illust: 'squat' },
        { code: 'A2', name: 'Prensa',         muscles: 'Cuádriceps, Glúteo',  sets: '4 × 12',   illust: 'press2' },
        { code: 'A3', name: 'Extensiones',    muscles: 'Cuádriceps',          sets: '3 × 15',   illust: 'extension' },
        { code: 'B1', name: 'Aducción',       muscles: 'Aductores',           sets: '3 × 15',   illust: 'adduction' },
        { code: 'B2', name: 'Gemelos parado', muscles: 'Gemelos',             sets: '4 × 15',   illust: 'calf' },
        { code: 'B3', name: 'Hip thrust',     muscles: 'Glúteos, Cuádriceps', sets: '4 × 10',   illust: 'thrust' },
      ],
    },
    {
      id: 'sab', day: 'Sábado', label: 'Sáb', type: 'Descanso', focus: '',rest: true, exercises: [],
    },
    { id: 'dom', day: 'Domingo', label: 'Dom', type: 'Descanso', focus: '', rest: true, exercises: [] },
  ];


  /** Actividad pseudo-aleatoria determinista por fecha (mock). */
  activityFor(y: number, m: number, d: number): number {
    const seed = (y * 13 + m * 31 + d * 17) % 100;
    const dow = new Date(y, m, d).getDay();
    if (dow === 0) return seed < 70 ? 0 : 30;
    if (seed < 18) return 0;
    if (seed < 32) return 20 + (seed % 10);
    if (seed < 62) return 35 + (seed % 25);
    if (seed < 85) return 65 + (seed % 25);
    if (seed < 95) return 95 + (seed % 25);
    return 125 + (seed % 20);
  }

  levelOf(min: number): HeatCell['level'] {
    if (min === 0) return 'empty';
    if (min < 30) return 'low';
    if (min < 60) return 'mod';
    if (min < 90) return 'rec';
    if (min < 120) return 'high';
    return 'crit';
  }

  /** Construye la grilla de semanas (Lun→Dom) para un mes dado. */
  buildWeeks(year: number, month: number): HeatCell[][] {
    const first = new Date(year, month, 1);
    const firstDow = (first.getDay() + 6) % 7; // 0 = Lunes
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: HeatCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      const row = cells.slice(i, i + 7).map((d): HeatCell => {
        if (d === null) return { day: null, minutes: 0, level: 'empty' };
        const minutes = this.activityFor(year, month, d);
        return { day: d, minutes, level: this.levelOf(minutes) };
      });
      rows.push(row);
    }
    return rows;
  }

  /** Estadísticas del mes: días activos, volumen total (h) y mejor racha. */
  monthStats(year: number, month: number): { active: number; hours: number; best: number } {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let active = 0, total = 0, streak = 0, best = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const a = this.activityFor(year, month, d);
      total += a;
      if (a > 0) { active++; streak++; best = Math.max(best, streak); }
      else streak = 0;
    }
    return { active, hours: Math.round(total / 60), best };
  }
}
