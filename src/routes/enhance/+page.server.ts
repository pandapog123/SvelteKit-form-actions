import { fail, redirect } from "@sveltejs/kit";

// Example form
export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      if (!formData.name || typeof formData.name !== "string") {
        throw new Error("Invalid name");
      }

      if (!formData.password || typeof formData.password !== "string") {
        throw new Error("Invalid password");
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      console.log(formData);
    } catch (err) {
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
