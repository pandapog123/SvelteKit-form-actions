import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  signup: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      if (!formData.name || typeof formData.name !== "string") {
        throw new Error("Invalid name");
      }

      if (!formData.email || typeof formData.email !== "string") {
        throw new Error("Invalid e-mail");
      }

      if (!formData.password || typeof formData.password !== "string") {
        throw new Error("Invalid password");
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      console.log(formData);
    } catch (err) {
      // Try to be as specific as possible with the data you send back
      // You could use "as const" for better type checking in your svelte page
      if (err instanceof Error) {
        return fail(500, {
          error: "signup",
          message: err.message,
          signup: formData,
        } as const);
      }

      return fail(500, {
        error: "signup",
        message: "Sample text",
        signup: formData,
      } as const);
    }

    throw redirect(303, "/");
  },
  login: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      if (!formData.email || typeof formData.email !== "string") {
        throw new Error("Invalid e-mail");
      }

      if (!formData.password || typeof formData.password !== "string") {
        throw new Error("Invalid password");
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      console.log(formData);
    } catch (err) {
      // Try to be as specific as possible with the data you send back
      if (err instanceof Error) {
        return fail(500, {
          error: "login",
          message: err.message,
          login: formData,
        } as const);
      }

      return fail(500, {
        error: "login",
        message: "Sample text",
        login: formData,
      } as const);
    }

    throw redirect(303, "/");
  },
};
