import { EventSourcePolyfill } from "event-source-polyfill";
import { useChatStore } from "@/store/chatStore";

export const useSSE = () => {
  const { addMessage, updateLastMessage, setLoading } = useChatStore.getState();

  const sendMessage = (message: string) => {
    setLoading(true);
    addMessage({ role: "user", text: message });
    addMessage({ role: "ai", text: "" });

    const eventSource = new EventSourcePolyfill(
      `/api/chat?message=${encodeURIComponent(message)}`
    );

    let aiResponse = "";

    eventSource.onmessage = (event) => {
      aiResponse += event.data;
      updateLastMessage(aiResponse);
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      setLoading(false);
      eventSource.close();
    };

    eventSource.addEventListener("end", () => {
      setLoading(false);
      eventSource.close();
    });
  };

  return { sendMessage };
};
