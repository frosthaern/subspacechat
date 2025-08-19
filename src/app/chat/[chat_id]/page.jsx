"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  MESSAGES_OF_CHAT_SUBSCRIPTION,
  INSERT_MESSAGE,
  INSERT_CHAT,
  SEND_MESSAGE,
} from "@/lib/graphql_schema";
import { useSubscription, useMutation } from "@apollo/client";
import Chats from "@/components/non_ui/chats";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatId() {
  const { chat_id } = useParams();
  const { data, loading, error } = useSubscription(
    MESSAGES_OF_CHAT_SUBSCRIPTION,
    {
      variables: { chat_id },
    }
  );
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(INSERT_MESSAGE);
  const [addChat] = useMutation(INSERT_CHAT);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = async () => {
    if (data?.subspace_chats.length == 0) {
      await addChat({
        variables: { title: message, chat_id },
      });
    }
    // my message
    await addMessage({ variables: { content: message, chat_id } });

    // trying to trigger n8n for llm message
    const { boolean_result } = await sendMessage({
      variables: { content: message, chat_id },
    });
    console.log(boolean_result);
    setMessage("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col max-w-2xl mx-auto mt-8 h-[700px] border rounded-md shadow-md">
      <div className="text-xl font-bold p-4 border-b">
        {data?.subspace_chats[0]?.title}
      </div>

      <Card className="flex-1 p-4 overflow-y-auto space-y-3 bg-background">
        {data?.subspace_chats[0]?.messages?.map((message) => (
          <div
            key={message.id}
            className={`max-w-[75%] p-3 rounded-lg break-words ${
              message.is_user
                ? "bg-primary text-primary-foreground ml-auto self-end"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {message.content}
          </div>
        ))}
      </Card>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex border-t p-4 gap-2"
      >
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
          autoComplete="off"
          required
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
