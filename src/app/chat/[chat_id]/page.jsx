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
    await sendMessage({ variables: { content: message, chat_id } });
    setMessage("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>{data?.subspace_chats[0]?.title}</div>
      <div className="flex flex-col h-[500px] overflow-y-scroll">
        <table className="border">
          <thead>
            <tr>
              <th className="border">{"id"}</th>
              <th className="border">{"is_user"}</th>
              <th className="border">{"message"}</th>
            </tr>
          </thead>
          <tbody>
            {data?.subspace_chats[0]?.messages?.map((message) => (
              <tr key={message.id}>
                <td className="border">{message.id}</td>
                <td className="border">{message.is_user ? "You" : "Other"}</td>
                <td className="border">{message.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <Chats />
    </div>
  );
}
