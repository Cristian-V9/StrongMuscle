import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  private router = inject(Router);
  protected auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  /** Cierra el menú colapsable en móvil tras navegar. */
  closeMobileMenu(): void {
    const el = document.getElementById('smNavLinks');
    if (el?.classList.contains('show')) {
      // Bootstrap está disponible globalmente vía el bundle JS
      const w = window as unknown as { bootstrap?: { Collapse: { getInstance(e: Element): { hide(): void } | null } } };
      w.bootstrap?.Collapse.getInstance(el)?.hide();
    }
  }
}
