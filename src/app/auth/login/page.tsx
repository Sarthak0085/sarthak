import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();
    console.log("session", session);
    if (session && session?.user) {
        redirect(`/${session?.user?.id}/portfolio`)
    }
    return (
        <SignIn />
    )
}