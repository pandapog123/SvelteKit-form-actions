<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

{#if data.user}
  <h1>Welcome back, {data.user.name}</h1>

  <p>Your email: {data.user.email}</p>

  <form action="/basic-auth?/logout" method="post" use:enhance>
    <button>Log out</button>
  </form>
{:else}
  <form action="/basic-auth?/signup" method="post" use:enhance>
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

  <form action="/basic-auth?/login" method="post" use:enhance>
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
{/if}
