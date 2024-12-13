import type { AstroCookies } from "astro"
import { config } from "@/config";
import { defineMiddleware } from "astro:middleware"
import { jwtVerify } from "jose";

export const onRequest = defineMiddleware(async (ctx, next) => {
    const cookies = ctx.cookies;
    await next();
});

function checkCookies(cookies: AstroCookies) {
    const { name, secret } = config.cookie;
    const authCookie = cookies.get(name);

    if (!authCookie) return false;

    jwtVerify(authCookie.value, new TextEncoder().encode(secret), {
        algorithms: ["RS256"]
    });
}