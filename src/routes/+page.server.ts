import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { recurringScheduleSchema, scheduleSchema } from '$lib/schemas/dashboard';

export const prerender = true;

export const load = async () => ({
  scheduleForm: await superValidate(zod4(scheduleSchema)),
  recurringForm: await superValidate(zod4(recurringScheduleSchema)),
});
