import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import {
  cancelSchedule,
  createRecurringSchedule,
  createSchedule,
  listDeviceEvents,
  listDevices,
  listRecurringSchedules,
  listSchedules,
  setRecurringScheduleEnabled,
  turnDeviceOff,
  turnDeviceOn,
  type Device,
  type DeviceEvent,
  type RecurringSchedule,
  type RecurringSchedulePayload,
  type SchedulePayload,
  type ScheduledCommand,
} from '$lib/api/dashboard';
import type { DashboardMessages } from '$lib/i18n/dashboard';
import type { DashboardAction, DashboardUiState, StatusTone } from '$lib/state/dashboard-ui-state';
import { recurringScheduleSchema, scheduleSchema } from '$lib/schemas/dashboard';

type DashboardControllerOptions = {
  messages: DashboardMessages;
  scheduleForm: Writable<SchedulePayload>;
  recurringForm: Writable<RecurringSchedulePayload>;
};

export function createDashboardController({
  messages,
  scheduleForm,
  recurringForm,
}: DashboardControllerOptions) {
  let devices = $state<Device[]>([]);
  let events = $state<DeviceEvent[]>([]);
  let schedules = $state<ScheduledCommand[]>([]);
  let recurringSchedules = $state<RecurringSchedule[]>([]);
  let selectedDeviceId = $state('');
  let uiState = $state<DashboardUiState>({ status: 'loading' });

  const selectedDevice = $derived(devices.find((device) => device.id === selectedDeviceId) ?? null);
  const onlineCount = $derived(devices.filter((device) => device.availability === 'Online').length);
  const activeRecurringCount = $derived(recurringSchedules.filter((item) => item.enabled).length);
  const loading = $derived(uiState.status === 'loading');
  const busy = $derived(uiState.status === 'submitting');
  const statusMessage = $derived(
    uiState.status === 'error'
      ? uiState.message
      : 'message' in uiState
        ? (uiState.message ?? '')
        : '',
  );
  const statusTone = $derived<StatusTone>(
    uiState.status === 'error'
      ? 'error'
      : uiState.status === 'ready'
        ? (uiState.tone ?? 'ok')
        : 'info',
  );

  async function refreshDevices() {
    setSubmitting('refresh');
    try {
      devices = await listDevices();
      selectedDeviceId = selectedDeviceId || devices[0]?.id || '';
      await refreshSelectedDevice();
      setStatus(messages.status.synced, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.loadDevices), 'error');
    }
  }

  async function selectDevice(deviceId: string) {
    selectedDeviceId = deviceId;
    setSubmitting('select-device');
    try {
      await refreshSelectedDevice();
      setStatus(messages.status.deviceUpdated, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.updateDevice), 'error');
    }
  }

  async function sendCommand(command: 'on' | 'off') {
    if (!selectedDeviceId) {
      return;
    }

    setSubmitting('command');
    try {
      if (command === 'on') {
        await turnDeviceOn(selectedDeviceId);
      } else {
        await turnDeviceOff(selectedDeviceId);
      }

      await refreshDevices();
      setStatus(command === 'on' ? messages.status.turnOnSent : messages.status.turnOffSent, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.commandFailed), 'error');
    }
  }

  async function submitSchedule(event: SubmitEvent) {
    event.preventDefault();
    if (!selectedDeviceId) {
      return;
    }

    const parsed = scheduleSchema.safeParse(get(scheduleForm));
    if (!parsed.success) {
      setStatus(parsed.error.issues[0]?.message ?? messages.errors.scheduleForm, 'error');
      return;
    }

    setSubmitting('schedule');
    try {
      await createSchedule(selectedDeviceId, parsed.data);
      scheduleForm.update((form) => ({ ...form, run_at: '' }));
      await refreshSelectedDevice();
      setStatus(messages.status.scheduleCreated, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.createSchedule), 'error');
    }
  }

  async function submitRecurringSchedule(event: SubmitEvent) {
    event.preventDefault();
    if (!selectedDeviceId) {
      return;
    }

    const parsed = recurringScheduleSchema.safeParse(get(recurringForm));
    if (!parsed.success) {
      setStatus(parsed.error.issues[0]?.message ?? messages.errors.recurringForm, 'error');
      return;
    }

    setSubmitting('recurring');
    try {
      await createRecurringSchedule(selectedDeviceId, parsed.data);
      recurringForm.update((form) => ({ ...form, start_time: '', end_time: '' }));
      await refreshSelectedDevice();
      setStatus(messages.status.recurringCreated, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.createRecurring), 'error');
    }
  }

  async function toggleRecurring(schedule: RecurringSchedule) {
    setSubmitting('recurring');
    try {
      await setRecurringScheduleEnabled(schedule.id, !schedule.enabled);
      await refreshSelectedDevice();
      setStatus(messages.status.recurringUpdated, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.updateRecurring), 'error');
    }
  }

  async function removeSchedule(scheduleId: number) {
    setSubmitting('schedule');
    try {
      await cancelSchedule(scheduleId);
      await refreshSelectedDevice();
      setStatus(messages.status.scheduleCancelled, 'ok');
    } catch (error) {
      setStatus(errorMessage(error, messages.errors.cancelSchedule), 'error');
    }
  }

  async function refreshSelectedDevice() {
    if (!selectedDeviceId) {
      events = [];
      schedules = [];
      recurringSchedules = [];
      return;
    }

    const [nextEvents, nextSchedules, nextRecurringSchedules] = await Promise.all([
      listDeviceEvents(selectedDeviceId),
      listSchedules(selectedDeviceId),
      listRecurringSchedules(selectedDeviceId),
    ]);

    events = nextEvents;
    schedules = nextSchedules;
    recurringSchedules = nextRecurringSchedules;
  }

  function setSubmitting(action: DashboardAction) {
    uiState = { status: 'submitting', action };
  }

  function setStatus(message: string, tone: StatusTone) {
    uiState = tone === 'error' ? { status: 'error', message } : { status: 'ready', message, tone };
  }

  function errorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? `${fallback}: ${error.message}` : fallback;
  }

  return {
    get devices() {
      return devices;
    },
    get events() {
      return events;
    },
    get schedules() {
      return schedules;
    },
    get recurringSchedules() {
      return recurringSchedules;
    },
    get selectedDeviceId() {
      return selectedDeviceId;
    },
    get selectedDevice() {
      return selectedDevice;
    },
    get onlineCount() {
      return onlineCount;
    },
    get activeRecurringCount() {
      return activeRecurringCount;
    },
    get loading() {
      return loading;
    },
    get busy() {
      return busy;
    },
    get statusMessage() {
      return statusMessage;
    },
    get statusTone() {
      return statusTone;
    },
    refreshDevices,
    selectDevice,
    sendCommand,
    submitSchedule,
    submitRecurringSchedule,
    toggleRecurring,
    removeSchedule,
  };
}
