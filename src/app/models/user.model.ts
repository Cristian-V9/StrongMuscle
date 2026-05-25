export type GoalId = 'deficit' | 'surplus' | 'recomp';

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  gender: string;
  age: number;
  weight: number;   // kg
  height: number;   // cm
  activity: string; // nivel de actividad
  goal: GoalId;
}
