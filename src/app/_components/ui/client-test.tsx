'use client'
import { api } from "@/trpc/react"
import { useAppContext } from "../global/context"
import { signIn , signOut} from "next-auth/react"
import { motion } from "motion/react"
import { Button } from "./button"

export default function ClientTest() {
    const isAuthenticated = useAppContext().isAuthenticated
    const user = useAppContext().user
    console.log("ClientTest user:", user)
    console.log("ClientTest isAuthenticated:", isAuthenticated)
    const post = api.post.getLatest.useQuery(undefined, {
        enabled: isAuthenticated
    })
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-white/20 h-full flex flex-col items-center justify-center rounded-lg bg-white/5 p-4">
            {!isAuthenticated ?
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">Hello World!</h1>
                    <p className="text-lg">Please sign in to see the latest post</p>
                    <Button
                        variant="primary"
                        size="md"
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
                        variant="primary"
                        size="md"
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