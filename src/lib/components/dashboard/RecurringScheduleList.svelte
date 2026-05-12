<script lang="ts">
  import type { RecurringSchedule } from '$lib/api/dashboard';
  import type { DashboardMessages } from '$lib/i18n/dashboard';

  let {
    copy,
    schedules,
    onToggle,
  }: {
    copy: DashboardMessages['recurringList'];
    schedules: RecurringSchedule[];
    onToggle: (schedule: RecurringSchedule) => void | Promise<void>;
  } = $props();
</script>

<section class="rounded-3xl border border-white/10 bg-slate-950/70 p-5 xl:col-span-1">
  <h2 class="text-lg font-semibold text-white">{copy.title}</h2>
  <div class="mt-4 space-y-3">
    {#each schedules as item (item.id)}
      <div class="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
        <div class="flex items-center justify-between gap-3">
          <p class="font-medium text-white">{item.start_time} - {item.end_time}</p>
          <button
            class="text-sm text-cyan-200 hover:text-cyan-100"
            type="button"
            onclick={() => void onToggle(item)}
          >
            {item.enabled ? copy.disable : copy.enable}
          </button>
        </div>
        <p class="mt-2 text-sm text-slate-400">
          {copy.lastError}: {item.last_error ?? copy.noError}
        </p>
      </div>
    {:else}
      <p class="rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-400">
        {copy.empty}
      </p>
    {/each}
  </div>
</section>
