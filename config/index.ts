import { z } from 'zod'

const configSchema = z.object({
    port: z.number().max(65535).min(0),
    cookie: z.object({
        secret: z.string(),
        name: z.string().min(1)
    }),
    prisma: z.object({
        url: z.string().url()
    })
})

const {
    PORT = '3000',
    COOKIE_SECRET,
    COOKIE_NAME,
    DATABASE_URL
} = Bun.env

export const config = configSchema.parse({
    port: parseInt(PORT),
    cookie: {
        secret: COOKIE_SECRET,
        name: COOKIE_NAME
    },
    prisma: {
        url: DATABASE_URL
    }
})