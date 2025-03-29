"use client";

import { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    console.log("prepreclient", message.trim() !== "");
    if (!message.trim()) return;
    console.log("preclient", message);
    try {
      const { data } = await axios.post("/api/chat", {
        message,
      });
      console.log("AI Response:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setMessage("");
  };

  return (
    <div className="flex flex-col items-start p-4 bg-white">
      <div className="border-1 border-gray-300 border-opacity-50 rounded-lg p-2 shadow-lg w-[450px] sm:w-[600px] md:w-[750px] lg:w-[1000px]">
        <textarea
          className="block h-20 w-full resize-none border-0 focus:ring-0 focus:border-transparent outline-none"
          placeholder="대화 내용을 입력해 주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            (e.preventDefault(), handleSend())
          }
        />
      </div>

      <Button
        className="px-4 py-2 mt-2 text-white bg-[#B8E986] hover:bg-[#A3D375] rounded-lg cursor-pointer"
        onClick={handleSend}
      >
        전송
      </Button>
    </div>
  );
}
