import type { PageServerLoad } from "./$types";
import { createUser, getUser, getUserByEmailAndPassword } from "$lib/auth.js";
import { fail } from "@sveltejs/kit";
import { ZodError, z } from "zod";

// DISCLAIMER: THIS SHOULD NOT BE YOUR AUTHENTICATION LOGIC
// PLEASE DO NOT USE THIS AS YOUR AUTHENTICATION LOGIC

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const load = (async ({ cookies }) => {
  const id = cookies.get("id");

  if (!id) {
    return {};
  }

  const user = getUser(id);

  if (!user) {
    return {};
  }

  return {
    user: {
      name: user.name,
      email: user.email,
    },
  };
}) satisfies PageServerLoad;

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("id");
  },
  signup: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      const parsedData = signupSchema.parse(formData);

      const id = createUser({
        name: parsedData.name,
        email: parsedData.email,
        password: parsedData.password,
      });

      cookies.set("id", id, {
        path: "/",
        httpOnly: true,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return fail(500, {
          error: "signup",
          message: err.issues[0].message,
          signup: formData,
        } as const);
      }

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

    return {
      authenticated: true,
    };
  },
  login: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      const parsedData = loginSchema.parse(formData);

      const id = getUserByEmailAndPassword(
        parsedData.email,
        parsedData.password
      );

      if (!id) {
        throw new Error(`User not found`);
      }

      cookies.set("id", id, {
        path: "/",
        httpOnly: true,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return fail(500, {
          error: "login",
          message: err.issues[0].message,
          login: formData,
        } as const);
      }

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

    return {
      authenticated: true,
    };
  },
};
