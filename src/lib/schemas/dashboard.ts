import { z } from 'zod';
import { DEFAULT_LOCALE, getDashboardMessages } from '$lib/i18n/dashboard';

const validation = getDashboardMessages(DEFAULT_LOCALE).validation;

export const scheduleSchema = z.object({
  command: z.enum(['turn_on', 'turn_off']).default('turn_on'),
  run_at: z.string().min(1, validation.runAtRequired),
});

export const recurringScheduleSchema = z.object({
  start_time: z.string().min(1, validation.startTimeRequired),
  end_time: z.string().min(1, validation.endTimeRequired),
});
