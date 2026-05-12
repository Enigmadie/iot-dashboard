<script lang="ts">
  import type { DeviceEvent } from '$lib/api/dashboard';
  import type { DashboardMessages } from '$lib/i18n/dashboard';

  let { copy, events }: { copy: DashboardMessages['events']; events: DeviceEvent[] } = $props();
</script>

<section class="rounded-3xl border border-white/10 bg-slate-950/70 p-5 xl:col-span-1">
  <h2 class="text-lg font-semibold text-white">{copy.title}</h2>
  <div class="mt-4 space-y-3">
    {#each events as event (event.id)}
      <article class="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
        <div class="flex items-start justify-between gap-3">
          <p class="font-medium text-white">{event.kind}</p>
          <time class="text-xs text-slate-500">{event.occurred_at}</time>
        </div>
        <p class="mt-2 text-sm text-slate-400">
          {event.name ?? event.state ?? event.availability ?? event.source_topic}
        </p>
      </article>
    {:else}
      <p class="rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-400">{copy.empty}</p>
    {/each}
  </div>
</section>
