import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function Chat() {
  const id = uuid();
  redirect(`/chat/${id}`);
}
