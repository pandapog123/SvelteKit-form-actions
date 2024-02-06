<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Named Forms</h1>

<!-- use the "action" attribute to signify that you want -->
<!-- to send this to a specific action -->
<!-- use the ?/name-of-form-action convention for named actions -->
<form action="/named-forms?/signup" method="post">
  <h2>Sign up</h2>

  <input
    type="text"
    name="name"
    placeholder="Name"
    value={form?.signup?.name ?? ""}
  />

  <input
    type="email"
    name="email"
    placeholder="E-mail"
    value={form?.signup?.email ?? ""}
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={form?.signup?.password ?? ""}
  />

  <button>Sign up</button>

  {#if form?.error === "signup"}
    <p>{form.message}</p>
  {/if}
</form>

<hr />

<!-- Do you notice what is the difference? -->
<form action="/named-forms?/login" method="post">
  <h2>Log in</h2>

  <input
    type="email"
    name="email"
    placeholder="E-mail"
    value={form?.login?.email ?? ""}
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={form?.login?.password ?? ""}
  />

  <button>Log in</button>

  {#if form?.error === "login"}
    <p>{form.message}</p>
  {/if}
</form>
