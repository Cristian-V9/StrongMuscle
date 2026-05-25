import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GoalId } from '../../models/user.model';

interface GoalOption {
  id: GoalId;
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  username = '';
  email = '';
  password = '';
  confirm = '';
  goal = signal<GoalId | null>(null);

  showPwd = signal(false);
  showPwd2 = signal(false);
  loading = signal(false);
  registerError = signal('');

  errors = signal<Record<string, boolean>>({});

  readonly goals: GoalOption[] = [
    { id: 'deficit', icon: 'bi-fire',             title: 'Déficit calórico',   desc: 'Quiero perder grasa' },
    { id: 'surplus', icon: 'bi-graph-up-arrow',   title: 'Superávit calórico', desc: 'Quiero ganar músculo' },
    { id: 'recomp',  icon: 'bi-arrow-left-right', title: 'Recomposición',      desc: 'Mantener y mejorar' },
  ];

  private validEmail(v: string): boolean {
    return /\S+@\S+\.\S+/.test(v.trim());
  }

  clearError(key: string): void {
    const e = { ...this.errors() };
    delete e[key];
    this.errors.set(e);
  }

  selectGoal(id: GoalId): void {
    this.goal.set(id);
    this.clearError('goal');
  }

  checkConfirm(): void {
    const e = { ...this.errors() };
    if (this.confirm && this.password && this.confirm !== this.password) e['confirm'] = true;
    else delete e['confirm'];
    this.errors.set(e);
  }

  async submit(): Promise<void> {
    const e: Record<string, boolean> = {};
    if (!this.username.trim()) e['username'] = true;
    if (!this.validEmail(this.email)) e['email'] = true;
    if (this.password.length < 8) e['password'] = true;
    if (!this.confirm || this.confirm !== this.password) e['confirm'] = true;
    if (!this.goal()) e['goal'] = true;
    this.errors.set(e);
    if (Object.keys(e).length) return;

    this.loading.set(true);
    this.registerError.set('');
    try {
      await this.auth.register(this.username.trim(), this.email.trim(), this.goal()!, this.password);
      this.router.navigate(['/mi-actividad']);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        this.registerError.set('Este correo ya está registrado');
      } else {
        this.registerError.set('Error al crear la cuenta. Intenta de nuevo');
      }
    } finally {
      this.loading.set(false);
    }
  }
}
