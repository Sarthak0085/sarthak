import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        })
    ]
} satisfies NextAuthConfig;