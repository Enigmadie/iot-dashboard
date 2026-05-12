<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { SchedulePayload } from '$lib/api/dashboard';
  import type { DashboardMessages } from '$lib/i18n/dashboard';

  let {
    copy,
    form,
    busy,
    disabled,
    onSubmit,
  }: {
    copy: DashboardMessages['scheduleForm'];
    form: Writable<SchedulePayload>;
    busy: boolean;
    disabled: boolean;
    onSubmit: (event: SubmitEvent) => void | Promise<void>;
  } = $props();
</script>

<section
  class="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30"
>
  <h2 class="text-lg font-semibold text-white">{copy.title}</h2>
  <p class="mt-1 text-sm text-slate-400">{copy.endpoint}</p>

  <form class="mt-5 space-y-4" onsubmit={(event) => void onSubmit(event)}>
    <label class="block text-sm font-medium text-slate-300" for="command">{copy.command}</label>
    <select
      id="command"
      class="w-full rounded-2xl border-white/10 bg-slate-900 text-white focus:border-cyan-400 focus:ring-cyan-400"
      bind:value={$form.command}
    >
      <option value="turn_on">turn_on</option>
      <option value="turn_off">turn_off</option>
    </select>

    <label class="block text-sm font-medium text-slate-300" for="run_at">{copy.runAt}</label>
    <input
      id="run_at"
      class="w-full rounded-2xl border-white/10 bg-slate-900 text-white focus:border-cyan-400 focus:ring-cyan-400"
      type="datetime-local"
      bind:value={$form.run_at}
    />

    <button
      class="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
      type="submit"
      disabled={disabled || busy}
    >
      {copy.submit}
    </button>
  </form>
</section>
