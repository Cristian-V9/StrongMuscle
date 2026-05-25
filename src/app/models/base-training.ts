/* Herencia: clase Padre — la usan Heatmap/Mi Actividad como base.
   Conservada del proyecto original para cumplir el requisito de herencia. */
export class BaseTraining {
  protected username = 'Amy Cardholder';
  protected mesActual = this.obtenerMesActual();

  protected obtenerMesActual(): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return meses[new Date().getMonth()];
  }

  /** Convierte minutos de actividad en un nivel de intensidad 0–5. */
  protected calcularIntensidad(minutos: number): number {
    if (minutos === 0) return 0;
    if (minutos < 30) return 1;
    if (minutos < 60) return 2;
    if (minutos < 90) return 3;
    if (minutos <= 120) return 4;
    return 5;
  }
}
