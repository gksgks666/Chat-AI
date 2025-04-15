import { create } from "zustand";

type Message = {
  role: "user" | "ai";
  text: string;
};

type ChatStore = {
  messages: Message[];
  isLoading: boolean;
  aiMessageBuffer: string;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateLastAiMessage: (text: string) => void;
  setLoading: (isLoading: boolean) => void;
  clearBuffer: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  aiMessageBuffer: "",
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastAiMessage: (text) =>
    set((state) => {
      const updated = [...state.messages];
      updated[updated.length - 1] = { role: "ai", text };
      return { messages: updated, aiMessageBuffer: text };
    }),
  setLoading: (isLoading) => set({ isLoading }),
  clearBuffer: () => set({ aiMessageBuffer: "" }),
}));
