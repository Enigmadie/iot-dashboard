<script lang="ts">
  import type { Device } from '$lib/api/dashboard';
  import type { DashboardMessages } from '$lib/i18n/dashboard';

  let {
    copy,
    devices,
    selectedDevice,
    selectedDeviceId,
    loading,
    busy,
    statusMessage,
    statusTone,
    onRefresh,
    onSelectDevice,
    onSendCommand,
  }: {
    copy: DashboardMessages['sidebar'];
    devices: Device[];
    selectedDevice: Device | null;
    selectedDeviceId: string;
    loading: boolean;
    busy: boolean;
    statusMessage: string;
    statusTone: 'ok' | 'error' | 'info';
    onRefresh: () => void | Promise<void>;
    onSelectDevice: (deviceId: string) => void | Promise<void>;
    onSendCommand: (command: 'on' | 'off') => void | Promise<void>;
  } = $props();

  function handleSelect(event: Event) {
    void onSelectDevice((event.currentTarget as HTMLSelectElement).value);
  }
</script>

<aside class="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30">
  <div class="flex items-center justify-between gap-3">
    <h2 class="text-lg font-semibold text-white">{copy.title}</h2>
    <button
      class="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      disabled={loading || busy}
      onclick={() => void onRefresh()}
    >
      {copy.refresh}
    </button>
  </div>

  <label class="mt-5 block text-sm font-medium text-slate-300" for="device">
    {copy.deviceSelect}
  </label>
  <select
    id="device"
    class="mt-2 w-full rounded-2xl border-white/10 bg-slate-900 text-white focus:border-cyan-400 focus:ring-cyan-400"
    disabled={loading || busy || devices.length === 0}
    value={selectedDeviceId}
    onchange={handleSelect}
  >
    {#each devices as device (device.id)}
      <option value={device.id}>{device.name}</option>
    {/each}
  </select>

  {#if selectedDevice}
    <div class="mt-5 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="font-semibold text-white">{selectedDevice.name}</p>
          <p class="mt-1 break-all text-xs text-slate-400">{selectedDevice.id}</p>
        </div>
        <span class="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-200">
          {selectedDevice.state}
        </span>
      </div>
      <p class="mt-4 text-sm text-slate-300">{copy.availability}: {selectedDevice.availability}</p>
    </div>
  {/if}

  <div class="mt-5 grid grid-cols-2 gap-3">
    <button
      class="rounded-2xl bg-emerald-400 px-4 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      disabled={!selectedDeviceId || busy}
      onclick={() => void onSendCommand('on')}
    >
      {copy.turnOn}
    </button>
    <button
      class="rounded-2xl bg-rose-400 px-4 py-3 font-semibold text-rose-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      disabled={!selectedDeviceId || busy}
      onclick={() => void onSendCommand('off')}
    >
      {copy.turnOff}
    </button>
  </div>

  {#if statusMessage}
    <p
      class={`mt-5 rounded-2xl px-4 py-3 text-sm ${
        statusTone === 'error'
          ? 'bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20'
          : statusTone === 'ok'
            ? 'bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-400/20'
            : 'bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-400/20'
      }`}
    >
      {statusMessage}
    </p>
  {/if}
</aside>
