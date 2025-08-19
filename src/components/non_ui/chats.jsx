"use client";

import { useQuery } from "@apollo/client";
import { FETCH_CHATS } from "@/lib/graphql_schema";
import nhost from "@/lib/nhost";
import Link from "next/link";

export default function Chats() {
  const user = nhost.auth.getUser();
  const { data, loading, error } = useQuery(FETCH_CHATS, {
    variables: { user_id: user?.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

return (
  <div className="space-y-2">
    {data?.subspace_chats?.map((chat) => (
      <div
        key={chat.id}
        className="px-4 py-3 rounded-lg cursor-pointer hover:bg-muted transition"
      >
        <Link href={`/chat/${chat.id}`}>{chat.title}</Link>
      </div>
    ))}
  </div>
);

}
