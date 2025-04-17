import { create } from "zustand";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  updateLastMessage: (text: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessage: (text) =>
    set((state) => {
      const updated = [...state.messages];
      updated[updated.length - 1] = { ...updated[updated.length - 1], text };
      return { messages: updated };
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));
