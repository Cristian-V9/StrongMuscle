export interface HeatCell {
  day: number | null;   // null = celda de relleno
  minutes: number;
  level: 'empty' | 'low' | 'mod' | 'rec' | 'high' | 'crit';
}

export interface IntensityScale {
  level: string;
  cssClass: string;
  label: string;
  minutes: string;
}
