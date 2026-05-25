import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  email = '';
  password = '';
  showPwd = signal(false);
  emailError = signal(false);
  loading = signal(false);
  loginError = signal('');

  // Modal "olvidé contraseña"
  forgotEmail = '';
  forgotSent = signal(false);
  forgotInvalid = signal(false);

  private validEmail(v: string): boolean {
    return /\S+@\S+\.\S+/.test(v.trim());
  }

  onEmailInput(): void {
    if (this.emailError()) this.emailError.set(false);
    if (this.loginError()) this.loginError.set('');
  }

  async submit(): Promise<void> {
    if (!this.validEmail(this.email)) {
      this.emailError.set(true);
      return;
    }
    this.loading.set(true);
    this.loginError.set('');
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/mi-actividad']);
    } catch (err: any) {
      this.loginError.set('Correo o contraseña incorrectos');
    } finally {
      this.loading.set(false);
    }
  }

  submitForgot(): void {
    if (!this.validEmail(this.forgotEmail)) {
      this.forgotInvalid.set(true);
      return;
    }
    this.forgotInvalid.set(false);
    this.forgotSent.set(true);
  }

  resetForgot(): void {
    this.forgotEmail = '';
    this.forgotSent.set(false);
    this.forgotInvalid.set(false);
  }
}
