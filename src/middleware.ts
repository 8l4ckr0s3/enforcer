import type { AstroCookies } from "astro"
import { config } from "@/config"
import { defineMiddleware } from "astro:middleware"
import { jwtVerify } from "jose"

export const onRequest = defineMiddleware(async (ctx, next) => {

    if (ctx.routePattern === "/login") return await next()

    const cookies = ctx.cookies
    const cookieRes = checkCookies(cookies)

    if (!cookieRes) {
        // redirect to login page
        return ctx.redirect("/login")
    }

    return await next()

});

function checkCookies(cookies: AstroCookies) {
    const { name, secret } = config.cookie
    const authCookie = cookies.get(name)

    if (!authCookie) return false

    jwtVerify(authCookie.value, new TextEncoder().encode(secret))
}