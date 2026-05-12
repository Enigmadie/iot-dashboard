<script lang="ts">
  import type { ScheduledCommand } from '$lib/api/dashboard';
  import type { DashboardMessages } from '$lib/i18n/dashboard';

  let {
    copy,
    schedules,
    onCancel,
  }: {
    copy: DashboardMessages['scheduleList'];
    schedules: ScheduledCommand[];
    onCancel: (scheduleId: number) => void | Promise<void>;
  } = $props();
</script>

<section class="rounded-3xl border border-white/10 bg-slate-950/70 p-5 xl:col-span-1">
  <h2 class="text-lg font-semibold text-white">{copy.title}</h2>
  <div class="mt-4 space-y-3">
    {#each schedules as schedule (schedule.id)}
      <div class="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
        <div class="flex items-center justify-between gap-3">
          <p class="font-medium text-white">{schedule.command}</p>
          <button
            class="text-sm text-rose-200 hover:text-rose-100"
            type="button"
            onclick={() => void onCancel(schedule.id)}
          >
            {copy.cancel}
          </button>
        </div>
        <p class="mt-2 text-sm text-slate-400">{schedule.run_at}</p>
        <p class="mt-1 text-xs uppercase tracking-wide text-cyan-200">{schedule.status}</p>
      </div>
    {:else}
      <p class="rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-400">{copy.empty}</p>
    {/each}
  </div>
</section>
