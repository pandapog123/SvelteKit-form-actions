<script lang="ts">
  import "$lib/main.css";
</script>

<main>
  <section class="content">
    <slot />
  </section>

  <div class="links">
    <a href="/basic-form">Basic Form</a>
    <a href="/sending-data">Sending data</a>
    <a href="/named-forms">Named forms</a>
    <a href="/enhance">Progressively enhancing your form</a>
    <a href="/basic-auth">Basic Auth</a>
  </div>
</main>

<style>
  main {
    /* height: 100vh; */
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .links {
    display: flex;
    gap: 1rem;
  }
</style>
