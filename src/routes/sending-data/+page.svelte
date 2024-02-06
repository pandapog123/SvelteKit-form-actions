<script lang="ts">
  import type { ActionData } from "./$types";

  // You have to include this if you want to access the
  // data passed by the form action
  export let form: ActionData;
</script>

<h1>Sending Data</h1>

<form method="post">
  <!-- You can set the default value of the inputs by the form data -->
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={form?.data.name ?? ""}
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={form?.data.password ?? ""}
  />

  <button>Submit form</button>

  {#if form?.error}
    <p>{form.error}</p>
  {/if}
</form>
