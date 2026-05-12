export const DEFAULT_LOCALE = 'ru';

export const dashboardMessages = {
  en: {
    header: {
      eyebrow: 'Home control PWA',
      title: 'Home control dashboard',
      description:
        'First vertical slice for the Rust API: devices, on/off commands, one-time jobs, recurring schedules, and latest events.',
      devicesMetric: 'devices',
      onlineMetric: 'online',
      activeMetric: 'active',
    },
    sidebar: {
      title: 'Devices',
      refresh: 'Refresh',
      deviceSelect: 'Select device',
      availability: 'Availability',
      turnOn: 'Turn on',
      turnOff: 'Turn off',
    },
    scheduleForm: {
      title: 'One-time command',
      endpoint: 'POST `/devices/:id/schedules`',
      command: 'Command',
      runAt: 'Date and time',
      submit: 'Schedule',
    },
    recurringForm: {
      title: 'Recurring scheduler',
      endpoint: 'POST `/devices/:id/recurring-schedules`',
      startTime: 'Turn on at',
      endTime: 'Turn off at',
      submit: 'Create schedule',
    },
    scheduleList: {
      title: 'One-time jobs',
      cancel: 'Cancel',
      empty: 'No jobs yet.',
    },
    recurringList: {
      title: 'Recurring schedules',
      enable: 'Enable',
      disable: 'Disable',
      lastError: 'last error',
      noError: 'none',
      empty: 'No recurring schedules yet.',
    },
    events: {
      title: 'Latest events',
      empty: 'No events yet.',
    },
    status: {
      synced: 'Synced with API',
      deviceUpdated: 'Device data updated',
      turnOnSent: 'Turn-on command sent',
      turnOffSent: 'Turn-off command sent',
      scheduleCreated: 'One-time command scheduled',
      recurringCreated: 'Recurring schedule created',
      recurringUpdated: 'Recurring schedule updated',
      scheduleCancelled: 'One-time command cancelled',
    },
    errors: {
      loadDevices: 'Failed to load devices',
      updateDevice: 'Failed to update device',
      commandFailed: 'Command failed',
      createSchedule: 'Failed to create one-time command',
      createRecurring: 'Failed to create recurring schedule',
      updateRecurring: 'Failed to update recurring schedule',
      cancelSchedule: 'Failed to cancel command',
      scheduleForm: 'Check the one-time command form',
      recurringForm: 'Check the recurring schedule form',
    },
    validation: {
      runAtRequired: 'Select command date and time',
      startTimeRequired: 'Set turn-on time',
      endTimeRequired: 'Set turn-off time',
    },
  },
  ru: {
    header: {
      eyebrow: 'Home control PWA',
      title: 'Панель управления домом',
      description:
        'Устройства, команды включения/выключения, разовые задачи, recurring schedules и последние события.',
      devicesMetric: 'устройства',
      onlineMetric: 'онлайн',
      activeMetric: 'активно',
    },
    sidebar: {
      title: 'Устройства',
      refresh: 'Обновить',
      deviceSelect: 'Выбор устройства',
      availability: 'Доступность',
      turnOn: 'Включить',
      turnOff: 'Выключить',
    },
    scheduleForm: {
      title: 'Разовая команда',
      endpoint: 'POST `/devices/:id/schedules`',
      command: 'Команда',
      runAt: 'Дата и время',
      submit: 'Запланировать',
    },
    recurringForm: {
      title: 'Повторяющиеся задачи',
      endpoint: 'POST `/devices/:id/recurring-schedules`',
      startTime: 'Включать в',
      endTime: 'Выключать в',
      submit: 'Создать расписание',
    },
    scheduleList: {
      title: 'Разовые задачи',
      cancel: 'Отменить',
      empty: 'Задач пока нет.',
    },
    recurringList: {
      title: 'Recurring schedules',
      enable: 'Включить',
      disable: 'Выключить',
      lastError: 'последняя ошибка',
      noError: 'нет',
      empty: 'Recurring schedules пока нет.',
    },
    events: {
      title: 'Последние события',
      empty: 'Событий пока нет.',
    },
    status: {
      synced: 'Синхронизировано с API',
      deviceUpdated: 'Данные устройства обновлены',
      turnOnSent: 'Команда включения отправлена',
      turnOffSent: 'Команда выключения отправлена',
      scheduleCreated: 'Разовая команда запланирована',
      recurringCreated: 'Recurring schedule создан',
      recurringUpdated: 'Recurring schedule обновлен',
      scheduleCancelled: 'Разовая команда отменена',
    },
    errors: {
      loadDevices: 'Не удалось загрузить устройства',
      updateDevice: 'Не удалось обновить устройство',
      commandFailed: 'Команда не выполнена',
      createSchedule: 'Не удалось создать разовую команду',
      createRecurring: 'Не удалось создать recurring schedule',
      updateRecurring: 'Не удалось обновить recurring schedule',
      cancelSchedule: 'Не удалось отменить команду',
      scheduleForm: 'Проверь форму разовой команды',
      recurringForm: 'Проверь форму расписания',
    },
    validation: {
      runAtRequired: 'Выбери дату и время запуска',
      startTimeRequired: 'Укажи время включения',
      endTimeRequired: 'Укажи время выключения',
    },
  },
} as const;

export type DashboardLocale = keyof typeof dashboardMessages;
export type DashboardMessages = (typeof dashboardMessages)[DashboardLocale];

export function getDashboardMessages(locale: DashboardLocale = DEFAULT_LOCALE) {
  return dashboardMessages[locale];
}
