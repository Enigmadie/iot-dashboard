<script lang="ts">
  import { onMount } from 'svelte';
  import { superForm } from 'sveltekit-superforms';
  import DashboardHeader from '$lib/components/dashboard/DashboardHeader.svelte';
  import DeviceSidebar from '$lib/components/dashboard/DeviceSidebar.svelte';
  import EventList from '$lib/components/dashboard/EventList.svelte';
  import RecurringScheduleForm from '$lib/components/dashboard/RecurringScheduleForm.svelte';
  import RecurringScheduleList from '$lib/components/dashboard/RecurringScheduleList.svelte';
  import ScheduleForm from '$lib/components/dashboard/ScheduleForm.svelte';
  import ScheduleList from '$lib/components/dashboard/ScheduleList.svelte';
  import { createDashboardController } from '$lib/controllers/dashboard.svelte';
  import { DEFAULT_LOCALE, getDashboardMessages } from '$lib/i18n/dashboard';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const copy = getDashboardMessages(DEFAULT_LOCALE);

  // svelte-ignore state_referenced_locally
  const schedule = superForm(data.scheduleForm, { resetForm: false });
  // svelte-ignore state_referenced_locally
  const recurring = superForm(data.recurringForm, { resetForm: false });
  const { form: scheduleForm } = schedule;
  const { form: recurringForm } = recurring;

  const dashboard = createDashboardController({
    messages: copy,
    scheduleForm,
    recurringForm,
  });

  onMount(() => {
    void dashboard.refreshDevices();
  });
</script>

<svelte:head>
  <meta name="theme-color" content="#0f172a" />
</svelte:head>

<main class="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
  <DashboardHeader
    copy={copy.header}
    deviceCount={dashboard.devices.length}
    onlineCount={dashboard.onlineCount}
    activeRecurringCount={dashboard.activeRecurringCount}
  />

  <section class="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
    <DeviceSidebar
      copy={copy.sidebar}
      devices={dashboard.devices}
      selectedDevice={dashboard.selectedDevice}
      selectedDeviceId={dashboard.selectedDeviceId}
      loading={dashboard.loading}
      busy={dashboard.busy}
      statusMessage={dashboard.statusMessage}
      statusTone={dashboard.statusTone}
      onRefresh={dashboard.refreshDevices}
      onSelectDevice={dashboard.selectDevice}
      onSendCommand={dashboard.sendCommand}
    />

    <div class="grid gap-6 xl:grid-cols-2">
      <ScheduleForm
        copy={copy.scheduleForm}
        form={scheduleForm}
        busy={dashboard.busy}
        disabled={!dashboard.selectedDeviceId}
        onSubmit={dashboard.submitSchedule}
      />
      <RecurringScheduleForm
        copy={copy.recurringForm}
        form={recurringForm}
        busy={dashboard.busy}
        disabled={!dashboard.selectedDeviceId}
        onSubmit={dashboard.submitRecurringSchedule}
      />
    </div>
  </section>

  <section class="grid gap-6 xl:grid-cols-3">
    <ScheduleList
      copy={copy.scheduleList}
      schedules={dashboard.schedules}
      onCancel={dashboard.removeSchedule}
    />
    <RecurringScheduleList
      copy={copy.recurringList}
      schedules={dashboard.recurringSchedules}
      onToggle={dashboard.toggleRecurring}
    />
    <EventList copy={copy.events} events={dashboard.events} />
  </section>
</main>
