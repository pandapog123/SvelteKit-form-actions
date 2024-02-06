<script lang="ts">
  import type { ActionData } from "./$types";

  // This is pure magic
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<h1>Enhancing Your Forms</h1>

<!-- You could literally just stick it into your forms if you wanted to -->
<!-- use:enhance allows you to run custom logic on the client-side before sending -->
<!-- the data over to the server, this could be used -->
<!-- for validation and preventing useless refreshes  -->
<!-- <form method="post" use:enhance>
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
</form> -->

<!-- Or you could run some custom logic -->
<form
  method="post"
  use:enhance={(request) => {
    // console.log(request);

    // The reference to the url where the action is
    request.action;

    // The reference to the form element
    request.formElement;

    // The reference to the form data
    request.formData;
    // console.log(Object.fromEntries(request.formData));

    // You can append custom elements to the form data
    request.formData.append("hello", "world");

    // The reference to the request controller
    request.controller;

    // These are the same
    // request.controller.abort();
    // request.cancel();

    // The reference to the
    // element that submitted the form
    request.submitter;

    return async (result) => {
      // This is where the fun is
      // console.log(result);

      // You can update the page's loading functions and/or the form
      await result.update({
        reset: true, // this resets the form
        invalidateAll: true, // this resets the page's loading functions
      });

      // The reference to the result's form data
      result.formData;
      // console.log(Object.fromEntries(result.formData));

      // The reference to the result's result...
      result.result;
    };
  }}
>
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
