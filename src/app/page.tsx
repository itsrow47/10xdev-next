import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import ClientTest from "./_components/ui/client-test";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="h-full">
        <h1 className="text-sm font-bold">Server Component</h1>
        <br />
        <ClientTest />
      </main>
    </HydrateClient>
  );
}
