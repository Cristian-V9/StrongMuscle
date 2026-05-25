# Proyecto H — StrongMuscle — Plataforma Web de Seguimiento de Entrenamiento

**Semestre V — Desarrollo de Software Web**  
Fundación Universitaria Compensar  
Docente: Nathaly Diaz Morales

---

## Autores

| Nombre |
|---|
| Juan D. Villanueva |
| Cristian A. Vargas |
| Diego A. Jiménez |

---

## Descripción

StrongMuscle es una plataforma web desarrollada en Angular que permite a los usuarios registrarse, iniciar sesión y llevar un seguimiento mensual de sus sesiones de entrenamiento. La app muestra un mapa de calor donde cada celda representa un día del mes y su color indica la intensidad de la actividad registrada. También incluye un plan de rutinas semanal organizado por grupos musculares y un perfil de usuario personalizable.

El proyecto pasó por tres versiones a lo largo del semestre, empezando desde un componente de heatmap básico hasta convertirse en una SPA completa con autenticación real contra Firebase.

---

# Versión 1.0

La primera versión fue un ejercicio puntual: mostrar un mapa de calor con datos simulados y practicar la estructura básica de componentes en Angular.

## Estructura del Proyecto

```
src/app/
├── shared/
│   ├── navbar/          → Componente normal (barra de navegación)
│   └── footer/          → Componente inline (pie de página)
├── heatmap/             → Componente principal (extiende BaseTraining)
├── models/
│   └── BaseTraining.ts  → Clase base (Herencia)
└── app.ts               → Componente raíz
```

## Temas Implementados

| Tema | Implementación |
|---|---|
| Componente normal | `NavbarComponent`, `HeatmapComponent` |
| Componente inline | `FooterComponent` — template y styles en el `.ts` |
| Interpolación | `{{ nombreUsuario }}`, `{{ mesActual }}`, `{{ semana.numero }}` |
| Bootstrap | Navbar, cards, grid, flexbox utilities |
| Herencia | `HeatmapComponent extends BaseTraining` |

## Escala de Intensidad

| Nivel | Descripción | Criterio |
|---|---|---|
| 0 | Sin Actividad | 0 minutos |
| 1 | Actividad Baja | Menos de 30 min |
| 2 | Actividad Moderada | 30 – 60 min |
| 3 | Recomendado | 60 – 90 min |
| 4 | Actividad Excesiva | 90 – 120 min |
| 5 | Crítico | Más de 120 min |

## Tecnologías

- Angular 17+ (Standalone Components)
- TypeScript
- Bootstrap 5
- CSS
- `Tener mucha Fé (opcional)`

---

# Versión 1.1

En esta versión se agregaron rutas, un formulario de login, un servicio de autenticación simulado y protección de rutas con guards. La app empezó a tomar forma como SPA real.

## Estructura del Proyecto

```
src/app/
├── shared/
│   ├── navbar/          → Componente normal (barra de navegación)
│   └── footer/          → Componente inline (pie de página)
├── home/                → Dashboard principal con tarjetas de acceso
├── login/               → Formulario de inicio de sesión
├── heatmap/             → Mapa de calor (extiende BaseTraining)
├── routines/            → Rutinas de ejercicio por nivel
├── services/
│   └── auth.ts          → Servicio de autenticación
├── guards/
│   └── auth-guard.ts    → Protección de rutas privadas
├── models/
│   └── BaseTraining.ts  → Clase base (Herencia)
├── app.routes.ts        → Configuración de rutas
└── app.ts               → Componente raíz
```

## Temas Implementados

| Tema | Implementación |
|---|---|
| Componente normal | `NavbarComponent`, `HeatmapComponent`, `HomeComponent`, `LoginComponent`, `RoutinesComponent` |
| Componente inline | `FooterComponent` — template y styles en el `.ts` |
| Interpolación | `{{ nombreUsuario }}`, `{{ mesActual }}`, `{{ semana.numero }}`, `{{ routine.name }}` |
| Bootstrap | Navbar, cards, grid responsive, flexbox utilities, formularios |
| Herencia | `HeatmapComponent extends BaseTraining` |
| Routing | `app.routes.ts` con 5 rutas y redirecciones |
| Two-way binding | `[(ngModel)]` en formulario de login |
| Directivas | `*ngFor` (rutinas, ejercicios), `*ngIf` (mensajes de error) |
| Servicios | `AuthService` con `@Injectable({ providedIn: 'root' })` |
| Guards | `AuthGuard` protege `/mapa-de-calor` y `/rutinas` |

## Rutas y Navegación

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | Redirige a `/home` | Público |
| `/home` | `HomeComponent` | Público |
| `/login` | `LoginComponent` | Público |
| `/mapa-de-calor` | `HeatmapComponent` | Requiere sesión |
| `/rutinas` | `RoutinesComponent` | Requiere sesión |
| `/**` | Redirige a `/home` | — |

Si un usuario no autenticado intenta acceder a `/mapa-de-calor` o `/rutinas`, el `AuthGuard` muestra una alerta y redirige al login.

## Tecnologías

- Angular 21 (Standalone Components)
- TypeScript
- Angular Router + Guards
- Angular Forms (`FormsModule`, `ngModel`)
- Bootstrap 5
- CSS
- `Tener mucha Fé (opcional)`

---

# Versión Final — StrongMuscle

La versión final reemplazó la autenticación simulada por Firebase real, expandió las páginas, agregó registro de usuarios y un perfil individual. También se rediseñó la estructura de carpetas para reflejar mejor la funcionalidad de cada módulo.

## Estructura del Proyecto

```
src/
├── firebase.config.ts         → Inicialización de Firebase (Auth + Firestore)
└── app/
    ├── shared/
    │   ├── navbar/            → Barra de navegación con menú de usuario
    │   └── footer/            → Pie de página
    ├── auth/
    │   ├── login/             → Formulario de inicio de sesión
    │   └── register/          → Formulario de registro con selección de objetivo
    ├── home/                  → Landing page pública
    ├── mi-actividad/          → Mapa de calor mensual (extiende BaseTraining)
    │   └── mi-actividad-locked/ → Vista bloqueada para usuarios sin sesión
    ├── rutinas/               → Plan semanal de ejercicios
    │   └── rutinas-locked/    → Vista bloqueada para usuarios sin sesión
    ├── perfil/                → Perfil del usuario con pestañas
    ├── services/
    │   ├── auth.service.ts    → Autenticación real con Firebase + estado global
    │   ├── training.service.ts → Datos de rutinas, heatmap y estadísticas
    │   └── auth.guard.ts      → Guards de protección de rutas
    ├── models/
    │   ├── user.model.ts      → Interfaz UserProfile y tipo GoalId
    │   ├── exercise.model.ts  → Interfaces Exercise y DayRoutine
    │   ├── heatmap.model.ts   → Interfaces HeatCell e IntensityScale
    │   └── base-training.ts   → Clase base (Herencia)
    ├── app.routes.ts          → Configuración de rutas con lazy loading
    ├── app.config.ts          → Configuración global de la app
    └── app.ts                 → Componente raíz
```

## Temas Implementados

| Tema | Implementación |
|---|---|
| SPA | Angular 21 con `RouterOutlet`, navegación sin recarga |
| Componentes standalone | Todos los componentes usan `standalone: true` |
| Jerarquía de componentes | `App` → `Navbar/Footer` (compartidos) → páginas individuales |
| Interpolación | `{{ auth.user()?.name }}`, `{{ monthLabel() }}`, `{{ stats().active }}` |
| Signals y estado reactivo | `signal()`, `computed()` en todos los componentes y servicios |
| Estado global | `AuthService` expone `loggedIn` y `user` como signals readonly |
| Two-way binding | `[(ngModel)]` en formularios de login y registro |
| Inputs/Outputs | Comunicación Navbar ↔ AuthService vía `inject()` y signals |
| Ciclo de vida | Computed signals como equivalente reactivo a `ngOnInit` |
| Herencia | `MiActividadComponent extends BaseTraining` |
| Routing con lazy loading | Todas las rutas usan `loadComponent()` |
| Guards | `authGuard` (redirige a login) y `gatedGuard` (redirige a versión bloqueada) |
| Servicios | `AuthService` y `TrainingService` con `@Injectable({ providedIn: 'root' })` |
| Modelos | Interfaces `UserProfile`, `DayRoutine`, `Exercise`, `HeatCell` |
| Firebase Authentication | Login y registro reales con `signInWithEmailAndPassword` / `createUserWithEmailAndPassword` |
| Firebase Firestore | Guardado y lectura del perfil de usuario en base de datos en tiempo real |
| Bootstrap 5 | Navbar responsive, cards, grid, dropdowns, modales, formularios |

## Rutas y Navegación

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | Redirige a `/home` | Público |
| `/home` | `HomeComponent` | Público |
| `/login` | `LoginComponent` | Público |
| `/registro` | `RegisterComponent` | Público |
| `/mi-actividad` | `MiActividadComponent` | Requiere sesión |
| `/mi-actividad-bloqueada` | `MiActividadLockedComponent` | Público (vista previa) |
| `/rutinas` | `RutinasComponent` | Requiere sesión |
| `/rutinas-bloqueada` | `RutinasLockedComponent` | Público (vista previa) |
| `/perfil` | `PerfilComponent` | Requiere sesión estricta |
| `/**` | Redirige a `/home` | — |

Las rutas de actividad y rutinas tienen dos versiones: una completa para usuarios autenticados y una "bloqueada" que muestra el contenido parcialmente para motivar el registro. El perfil usa `authGuard` estricto que redirige directamente al login.

## Arquitectura del Sistema

```
Firebase Auth ──────────────────────────────────────┐
Firebase Firestore ──────────────────────────────────┤
                                                     ▼
LoginComponent ──────→ AuthService (signal: loggedIn, user)
RegisterComponent ───→      │
                            │ inject()
                    NavbarComponent
                    PerfilComponent
                    MiActividadComponent

TrainingService (rutinas, heatmap, estadísticas)
        │ inject()
MiActividadComponent (extends BaseTraining)
RutinasComponent
```

## Tecnologías

- Angular 21 (Standalone Components)
- TypeScript
- Angular Router con lazy loading y Guards
- Angular Signals (`signal`, `computed`)
- Angular Forms (`FormsModule`, `ngModel`)
- Firebase Authentication
- Firebase Firestore (Realtime Database)
- Bootstrap 5 + Bootstrap Icons
- CSS
- `Tener mucha Fé (opcional)`

---

## Instalación y Ejecución

> **Nota:** La lógica de conexión a Firebase está comentada en los servicios. Para correr el proyecto con datos reales, se necesita crear una base de datos propia en Firebase (tipo Realtime Database o Firestore) y actualizar la URL en `src/firebase.config.ts`.

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
ng serve
```

Abrir en el navegador: `http://localhost:4200`

---