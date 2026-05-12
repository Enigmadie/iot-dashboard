import { http } from '$lib/api/http';

export type Device = {
  id: string;
  name: string;
  state: string;
  availability: string;
};

export type DeviceEvent = {
  id: number;
  device_id: string;
  kind: string;
  name?: string | null;
  state?: string | null;
  availability?: string | null;
  source_topic: string;
  payload: unknown;
  occurred_at: string;
};

export type ScheduledCommand = {
  id: number;
  device_id: string;
  command: 'turn_on' | 'turn_off';
  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled';
  run_at: string;
  last_error?: string | null;
};

export type RecurringSchedule = {
  id: number;
  device_id: string;
  start_time: string;
  end_time: string;
  enabled: boolean;
  last_started_on?: string | null;
  last_ended_on?: string | null;
  last_error?: string | null;
};

export type SchedulePayload = {
  command: 'turn_on' | 'turn_off';
  run_at: string;
};

export type RecurringSchedulePayload = {
  start_time: string;
  end_time: string;
};

export async function listDevices() {
  const { data } = await http.get<Device[]>('/devices');
  return data;
}

export async function listDeviceEvents(deviceId: string, limit = 20) {
  const { data } = await http.get<DeviceEvent[]>(
    `/devices/${encodeURIComponent(deviceId)}/events`,
    {
      params: { limit },
    },
  );
  return data;
}

export async function listSchedules(deviceId: string) {
  const { data } = await http.get<ScheduledCommand[]>(
    `/devices/${encodeURIComponent(deviceId)}/schedules`,
  );
  return data;
}

export async function listRecurringSchedules(deviceId: string) {
  const { data } = await http.get<RecurringSchedule[]>(
    `/devices/${encodeURIComponent(deviceId)}/recurring-schedules`,
  );
  return data;
}

export async function turnDeviceOn(deviceId: string) {
  await http.post(`/devices/${encodeURIComponent(deviceId)}/turn-on`);
}

export async function turnDeviceOff(deviceId: string) {
  await http.post(`/devices/${encodeURIComponent(deviceId)}/turn-off`);
}

export async function createSchedule(deviceId: string, payload: SchedulePayload) {
  const { data } = await http.post<ScheduledCommand>(
    `/devices/${encodeURIComponent(deviceId)}/schedules`,
    payload,
  );
  return data;
}

export async function cancelSchedule(scheduleId: number) {
  await http.delete(`/schedules/${scheduleId}`);
}

export async function createRecurringSchedule(deviceId: string, payload: RecurringSchedulePayload) {
  const { data } = await http.post<RecurringSchedule>(
    `/devices/${encodeURIComponent(deviceId)}/recurring-schedules`,
    payload,
  );
  return data;
}

export async function setRecurringScheduleEnabled(scheduleId: number, enabled: boolean) {
  await http.patch(`/recurring-schedules/${scheduleId}`, { enabled });
}
