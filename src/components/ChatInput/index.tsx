"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

export default function ChatInput() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState({role: "", text:""});

  const handleSend = async () => {
    console.log("prepreclient", message.trim() !== "");
    if (!message.trim()) return;
    console.log("preclient", message);
    const EventSource = NativeEventSource || EventSourcePolyfill;
    const eventSource = new EventSource("/api/chat", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ message }),
    });
    console.log("AI Response");

    let aiMessage = "";
    eventSource.onmessage = (event) => {
      aiMessage += event.data; // 한 글자씩 추가
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: aiMessage },
      ]);
    };

    eventSource.onerror = (err) => { // 오류 시 처리
      console.error("SSE Error:", err);
      eventSource.close();
      //setIsLoading(false);
    };

    eventSource.onopen = () => { // sse 연결 성공 시 처리
      setMessages((prev) => [...prev, { role: "ai", text: "" }]); // AI 메시지 추가
    };

    eventSource.addEventListener("end", () => { //sse 종료 시 처리
      eventSource.close();
      //setIsLoading(false);
    });
  };
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
