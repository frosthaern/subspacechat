// "use client";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import {
//   MESSAGES_OF_CHAT_SUBSCRIPTION,
//   INSERT_MESSAGE,
//   INSERT_CHAT,
//   SEND_MESSAGE,
//   FETCH_CHATS,
// } from "@/lib/graphql_schema";
// import { useSubscription, useMutation, useQuery } from "@apollo/client";
// import Chats from "@/components/non_ui/chats";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import nhost from "@/lib/nhost";

// export default function ChatId() {
//   const { chat_id } = useParams();
//   const { data, loading, error } = useSubscription(
//     MESSAGES_OF_CHAT_SUBSCRIPTION,
//     {
//       variables: { chat_id },
//     }
//   );
//   const [message, setMessage] = useState("");
//   const [addMessage] = useMutation(INSERT_MESSAGE);
//   const [addChat] = useMutation(INSERT_CHAT);
//   const [sendMessage] = useMutation(SEND_MESSAGE);
//   const user = nhost.auth.getUser();
//   const { data: chatData } = useQuery(FETCH_CHATS, {
//     variables: { user_id: user?.id },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleSend = async () => {
//     if (data?.subspace_chats.length == 0) {
//       await addChat({
//         variables: { title: message, chat_id },
//       });
//     }
//     // my message
//     await addMessage({ variables: { content: message, chat_id } });

//     // trying to trigger n8n for llm message
//     const { boolean_result } = await sendMessage({
//       variables: { content: message, chat_id },
//     });
//     console.log(boolean_result);
//     setMessage("");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="flex flex-col max-w-4xl mx-auto mt-8 h-[700px] border rounded-md shadow-md bg-white">
//       {/* Chat history panel */}
//       <div className="border-b p-4 font-semibold text-lg bg-muted">
//         Chat History
//       </div>
//       <div className="flex flex-grow overflow-hidden">
//         {/* Left: Chat history list */}
//         <aside className="w-64 border-r overflow-y-auto bg-muted p-4 space-y-2">
//           {chatData?.subspace_chats?.map((chat) => (
//             <div
//               key={chat.id}
//               className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10 transition"
//             >
//               <Link
//                 href={`/chat/${chat.id}`}
//                 className="block text-sm truncate"
//               >
//                 {chat.title}
//               </Link>
//             </div>
//           ))}
//         </aside>

//         {/* Right: Chat window */}
//         <main className="flex flex-col flex-1">
//           {/* Title */}
//           <header className="p-4 border-b font-semibold text-lg bg-muted">
//             {data?.subspace_chats[0]?.title}
//           </header>

//           {/* Chat messages */}
//           <Card className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
//             {data?.subspace_chats?.messages?.map((message) => (
//               <div
//                 key={message.id}
//                 className={`max-w-[75%] p-3 rounded-lg break-words ${
//                   message.is_user
//                     ? "bg-primary text-primary-foreground ml-auto self-end"
//                     : "bg-muted text-muted-foreground"
//                 }`}
//                 style={{ clear: "both" }}
//               >
//                 {message.content}
//               </div>
//             ))}
//           </Card>

//           {/* Input area */}
//           <Input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1"
//             autoComplete="off"
//             required
//           />
//           <Button onClick={handleSend}>
//             Send
//           </Button>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MESSAGES_OF_CHAT_SUBSCRIPTION,
  INSERT_MESSAGE,
  INSERT_CHAT,
  SEND_MESSAGE,
  FETCH_CHATS,
} from "@/lib/graphql_schema";
import { useSubscription, useMutation, useQuery } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Send, MessageCircle, Plus, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import nhost from "@/lib/nhost";
import { toast } from "sonner";
import { useAuthenticationStatus } from "@nhost/react";

export default function ChatId() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = nhost.auth.getUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user?.emailVerified) {
        toast.error("Login to Access the Chat");
        router.replace("/");
      }
    }
  }, [isAuthenticated, user?.emailVerified, router, isLoading]);

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
  const { data: chatData } = useQuery(FETCH_CHATS, {
    variables: { user_id: user?.id },
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">
            Loading your conversation...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold text-lg">
            Something went wrong
          </p>
          <p className="text-slate-600 mt-2">{error.message}</p>
        </div>
      </div>
    );

  const handleSend = async () => {
    if (data?.subspace_chats.length == 0) {
      await addChat({
        variables: { title: message, chat_id },
      });
    }
    await addMessage({ variables: { content: message, chat_id } });

    const { boolean_result } = await sendMessage({
      variables: { content: message, chat_id },
    });
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSend();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="max-w-7xl mx-auto h-screen flex">
        <aside className="w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col">
          <div className="p-6 border-b border-slate-200/60">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-lg">ChatBot</h1>
                <p className="text-sm text-slate-500">AI Assistant</p>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/25 transition-all duration-200 m-2"
              onClick={() => {
                router.replace("/chat");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/25 transition-all duration-200 m-2"
              onClick={async () => {
                await nhost.auth.signOut();
              }}
            >
              Log Out
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Recent Conversations
            </h3>
            {chatData?.subspace_chats?.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={`block p-3 rounded-xl transition-all duration-200 hover:bg-slate-100/80 group ${
                  chat.id === chat_id
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50"
                    : "hover:shadow-sm"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-slate-100 group-hover:bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    <MessageCircle className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-slate-900">
                      {chat.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            {(!chatData?.subspace_chats ||
              chatData.subspace_chats.length === 0) && (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No conversations yet</p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
          {/* Chat Header */}
          <header className="p-6 border-b border-slate-200/60 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-lg">
                  {data?.subspace_chats[0]?.title || "New Conversation"}
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-slate-500">
                    AI Assistant is online
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!data?.subspace_chats ||
            data.subspace_chats.length === 0 ||
            !data.subspace_chats[0]?.messages ||
            data.subspace_chats[0].messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Start a conversation
                </h3>
                <p className="text-slate-600 max-w-md">
                  Hello! I'm your AI assistant. Feel free to ask me anything or
                  start a conversation.
                </p>
              </div>
            ) : (
              data.subspace_chats[0].messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.is_user ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      msg.is_user ? "flex-row-reverse" : "flex-row"
                    } space-x-3`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.is_user
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 ml-3"
                          : "bg-gradient-to-br from-emerald-500 to-teal-600 mr-3"
                      }`}
                    >
                      {msg.is_user ? (
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                        msg.is_user
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-md"
                          : "bg-white border border-slate-200/60 text-slate-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/60 backdrop-blur-sm border-t border-slate-200/60">
            <div className="flex items-end space-x-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-4 pr-12 py-4 rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-lg focus:border-blue-300 transition-all duration-200 resize-none"
                  autoComplete="off"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
