import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

interface NotifSetting {
  id: string;
  title: string;
  desc: string;
  enabled: boolean;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil.html',
})
export class PerfilComponent {
  protected auth = inject(AuthService);

  readonly activeTab = signal<'info' | 'config' | 'notif'>('info');

  readonly goalLabel = computed(() => {
    const g = this.auth.user()?.goal;
    return g ? this.auth.goalLabel(g) : 'Recomposición';
  });

  notifications: NotifSetting[] = [
    { id: 'ntf1', title: 'Recordatorios de entrenamiento', desc: 'Te avisamos cada día a la hora que sueles entrenar para que no pierdas la racha.', enabled: true },
    { id: 'ntf2', title: 'Logros y metas alcanzadas',      desc: 'Recibe una nota cuando completes un objetivo o cierres una semana al 100%.', enabled: true },
    { id: 'ntf3', title: 'Actualizaciones de la app',      desc: 'Novedades, mejoras y rutinas nuevas. Sin spam, lo prometemos.', enabled: false },
  ];

  setTab(tab: 'info' | 'config' | 'notif'): void {
    this.activeTab.set(tab);
  }
}
