import { signIn } from "@/auth"

export const SignIn = () => {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
            className="flex items-center justify-center overflow-x-clip overflow-y-clip w-[100%] h-[100vh]"
        >
            <button type="submit" className="border border-white/15 text-white p-3 rounded-lg">Signin with GitHub</button>
        </form>
    )
} 