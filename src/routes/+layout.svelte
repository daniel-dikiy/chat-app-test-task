<script>
  import 'src/app.scss';
  import Header from 'routes/Header.svelte';
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>
</div>
