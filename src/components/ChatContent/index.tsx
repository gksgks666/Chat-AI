"use client";

import { useChatStore } from "@/stores/chatStore";
import ChatBubble from "@/components/ChatBubble";

export default function ChatContent() {
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center text-3xl m-4 h-full w-[450px] sm:w-[600px] md:w-[750px] lg:w-[1000px] min-h-[300px]">
        무엇을 도와드릴까요?
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-6 w-[450px] sm:w-[600px] md:w-[750px] lg:w-[1000px] ">
      {messages.slice(0, -1).map((msg, idx) => (
        <ChatBubble key={idx} role={msg.role} text={msg.text} />
      ))}
      {isLoading ? (
        <div className="text-center p-4">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        messages.length > 0 && (
          <ChatBubble
            key={messages.length - 1}
            role={messages[messages.length - 1].role}
            text={messages[messages.length - 1].text}
          />
        )
      )}
    </div>
  );
}
