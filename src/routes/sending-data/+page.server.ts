import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    // You can do simple if blocks
    if (!formData.name || typeof formData.name !== "string") {
      return {
        error: "Invalid name",
        data: formData,
      };
    }

    // You can also do try-catch blocks
    try {
      // Throw errors that will be caught by the catch block
      if (!formData.password || typeof formData.password !== "string") {
        throw new Error("Invalid password");
      }

      // Custom error messages
      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      // Process request...
      console.log(formData);
    } catch (err) {
      // You can send back the form data
      if (err instanceof Error) {
        return fail(500, {
          error: err.message,
          data: formData,
        });
      }

      return fail(500, {
        error: "Sample text",
        data: formData,
      });
    }

    throw redirect(303, "/");
  },
};
