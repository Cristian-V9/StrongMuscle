export interface Exercise {
  code: string;     // A1, A2, B1...
  name: string;
  muscles: string;
  sets: string;     // "4 × 8-10"
  illust: string;   // nombre del PNG en assets/exercises/
}

export interface DayRoutine {
  id: string;        // 'lun', 'mar'...
  day: string;       // 'Lunes'
  label: string;     // 'Lun'
  type: string;      // 'Push Day'
  focus: string;     // 'Pecho · Hombro · Tríceps'
  rest?: boolean;
  exercises: Exercise[];
}
