export type DashboardAction = 'refresh' | 'select-device' | 'command' | 'schedule' | 'recurring';

export type StatusTone = 'ok' | 'error' | 'info';

export type DashboardUiState =
  | { status: 'loading' }
  | { status: 'ready'; message?: string; tone?: Exclude<StatusTone, 'error'> }
  | { status: 'submitting'; action: DashboardAction }
  | { status: 'error'; message: string };
