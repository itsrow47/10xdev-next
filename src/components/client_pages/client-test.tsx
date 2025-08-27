'use client'
import { api } from "@/trpc/react"
import { signIn, signOut } from "next-auth/react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { BoxIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Loader from "../ui/loader"

export default function ClientTest() {
    const { data: session, status } = useSession()
    const isAuthenticated = !!session
    const user = session?.user
    const post = api.post.getLatest.useQuery(undefined, {
        enabled: isAuthenticated
    })

    if (status === "loading") {
        return <div className="h-full w-full flex items-center justify-center"><Loader /></div>
    }

    if (status === "unauthenticated") {
        return (
            <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-white/20 h-[90%] flex flex-col items-center justify-center rounded-lg bg-primary/5 p-4">
                {!isAuthenticated ?
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl flex gap-x-3 items-center"><BoxIcon />Client Component and Lucid React Icon!</h1>
                        <Button
                            className="mt-4"
                            onClick={() => signIn("google")}
                        >
                            Sign in with Google
                        </Button>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-sm">You are signed in 🎉</span>
                        <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
                        <p className="">
                            {post.data ? (
                                <div key={post.data.id}>
                                    <h2 className="text-2xl font-bold">{post.data.name}</h2>
                                </div>
                            ) : (
                                <span className="text-lg">
                                    No posts found.
                                </span>
                            )}
                        </p>
                        <Button
                            className="mt-4"
                            onClick={() => signOut()}
                        >
                            Sign out
                        </Button>
                    </div>
                }
            </motion.div>
        )
    }
}