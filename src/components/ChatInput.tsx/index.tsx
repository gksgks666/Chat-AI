"use client";

import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-start p-4 bg-white">
      <div className="border-1 border-gray-300 border-opacity-50 rounded-lg p-2 shadow-lg w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1000px]">
        <textarea
          className="block h-20 w-full resize-none border-0 focus:ring-0 focus:border-transparent outline-none"
          placeholder="대화 내용을 입력해 주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button className="px-4 py-2 mt-2 text-white bg-[#B8E986] hover:bg-[#A3D375] rounded-lg cursor-pointer">
        전송
      </button>
    </div>
  );
}
