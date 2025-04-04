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
        <ClientTest />
      </main>
    </HydrateClient>
  );
}
