"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useSSE } from "@/utils/useSSE";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage } = useSSE();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("prepreclient", input.trim() !== "");
    if (!input.trim()) return;
    console.log("preclient", input);
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col items-start p-4 bg-white">
      <div className="border-1 border-gray-300 border-opacity-50 rounded-lg p-2 shadow-lg w-[450px] sm:w-[600px] md:w-[750px] lg:w-[1000px]">
        <textarea
          className="block h-20 w-full resize-none border-0 focus:ring-0 focus:border-transparent outline-none"
          placeholder="대화 내용을 입력해 주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
        />
      </div>

      <Button
        className={`px-4 py-2 mt-2 text-white rounded-lg cursor-pointer ${
          input
            ? "bg-[#B8E986] hover:bg-[#A3D375]"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!input}
      >
        전송
      </Button>
    </div>
  );
}
