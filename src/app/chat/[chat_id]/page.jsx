"use client";
import { useParams } from "next/navigation";

export default function ChatId() {
  const { chat_id } = useParams();

  return (
    <>
      {/* for the current chat messages */}
      <div>{chat_id}</div>
      {/* for the input box to write the message */}
      <div></div>
      {/* for the chat history */}
      <div></div>
    </>
  );
}
