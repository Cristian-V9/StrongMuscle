import { Injectable, signal, computed } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import { UserProfile, GoalId } from '../models/user.model';

const GOAL_LABELS: Record<GoalId, string> = {
  deficit: 'Déficit calórico',
  surplus: 'Superávit calórico',
  recomp: 'Recomposición',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _loggedIn = signal(false);
  private readonly _user = signal<UserProfile | null>(null);

  readonly loggedIn = this._loggedIn.asReadonly();
  readonly user = this._user.asReadonly();

  readonly avatarInitial = computed(() =>
    (this._user()?.name || 'U').charAt(0).toUpperCase()
  );

  isLoggedIn(): boolean {
    return this._loggedIn();
  }

  goalLabel(goal: GoalId): string {
    return GOAL_LABELS[goal];
  }

  /** Login real con Firebase Authentication + carga perfil de Firestore */
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;

    // Buscar perfil en Firestore por email
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      this._user.set(snap.data() as UserProfile);
    } else {
      // Si no existe doc con uid, buscar por email como fallback
      const local = (email.split('@')[0] || 'Usuario').trim();
      const name = local.charAt(0).toUpperCase() + local.slice(1);
      this._user.set({
        name,
        handle: '@' + local.toLowerCase(),
        email,
        gender: 'Femenino',
        age: 22,
        weight: 70,
        height: 164,
        activity: 'Moderada',
        goal: 'recomp',
      });
    }
    this._loggedIn.set(true);
  }

  /** Registro real con Firebase Authentication + guarda perfil en Firestore */
  async register(username: string, email: string, goal: GoalId, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;

    const profile: UserProfile = {
      name: username,
      handle: '@' + username.toLowerCase(),
      email,
      gender: 'Femenino',
      age: 22,
      weight: 70,
      height: 164,
      activity: 'Moderada',
      goal,
    };

    // Guardar perfil en Firestore
    await setDoc(doc(db, 'users', uid), profile);
    this._user.set(profile);
    this._loggedIn.set(true);
  }

  logout(): void {
    signOut(auth);
    this._loggedIn.set(false);
    this._user.set(null);
  }
}
