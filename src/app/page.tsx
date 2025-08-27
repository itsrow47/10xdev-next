import { HydrateClient } from "@/trpc/server";
import ClientTest from "@/components/client_pages/client-test";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="h-full">
        <h1 className="text-sm font-bold text-center">Server Component</h1>
        <br />
        <ClientTest />
      </main>
    </HydrateClient>
  );
}
