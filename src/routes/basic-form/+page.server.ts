// For form actions to work, you have to include a +page.server.ts file somewhere.
// The form can reference any action in your app but it is good practice to
// include the +page.svelte file in the same route that the +page.server.ts file is in.

import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions = {
  // You can name your actions,
  // but if you have a default action,
  // you don't need to add the "action" property
  // to your form elements.
  default: async ({ request }) => {
    // You can reference the inputs through the request
    const formData = await request.formData();

    // You can access the elements of the form through
    // formData.get("name-of-property")
    // This returns one item (the value or null)
    console.log(formData.get("name"));

    // Or, you can access the elements through
    // an object that you create from the form data
    const formDataObj = Object.fromEntries(formData);

    // this returns the entire form
    console.log(formDataObj);

    // You can return data or you can redirect the user
    throw redirect(303, "/");
  },
};
