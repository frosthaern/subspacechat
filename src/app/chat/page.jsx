"use client";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter()
  const id = uuid();
  router.replace(`/chat/${id}`);
}
