<script lang="ts">
  import type { DashboardMessages } from '$lib/i18n/dashboard';

  let {
    copy,
    deviceCount,
    onlineCount,
    activeRecurringCount,
  }: {
    copy: DashboardMessages['header'];
    deviceCount: number;
    onlineCount: number;
    activeRecurringCount: number;
  } = $props();
</script>

<section
  class="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/40 backdrop-blur md:p-8"
>
  <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div class="max-w-2xl">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{copy.eyebrow}</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {copy.title}
      </h1>
      <p class="mt-4 text-base leading-7 text-slate-300">{copy.description}</p>
    </div>

    <div class="grid grid-cols-3 gap-3 text-center">
      <div class="rounded-2xl bg-slate-950/50 p-4 ring-1 ring-white/10">
        <p class="text-2xl font-bold text-white">{deviceCount}</p>
        <p class="text-xs uppercase tracking-wide text-slate-400">{copy.devicesMetric}</p>
      </div>
      <div class="rounded-2xl bg-slate-950/50 p-4 ring-1 ring-white/10">
        <p class="text-2xl font-bold text-emerald-300">{onlineCount}</p>
        <p class="text-xs uppercase tracking-wide text-slate-400">{copy.onlineMetric}</p>
      </div>
      <div class="rounded-2xl bg-slate-950/50 p-4 ring-1 ring-white/10">
        <p class="text-2xl font-bold text-cyan-300">{activeRecurringCount}</p>
        <p class="text-xs uppercase tracking-wide text-slate-400">{copy.activeMetric}</p>
      </div>
    </div>
  </div>
</section>
