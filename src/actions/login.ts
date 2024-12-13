import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const login = defineAction({
    accept: 'form',
    input: z.object({
        username: z.string(),
        password: z.string(),
    }),
    handler: async ({ username, password }) => {
        return `Hello, ${username} with password ${password}`
    }
})