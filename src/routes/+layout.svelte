<script lang="ts">
  import './layout.css';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />
  <title>IoT Dashboard</title>
  <meta
    name="description"
    content="PWA dashboard for home devices, commands, events, and recurring schedules."
  />
</svelte:head>
{@render children()}
