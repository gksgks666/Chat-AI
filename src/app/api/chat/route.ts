import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

interface MessagePart {
  text: string;
}

interface MessageHistory {
  role: "user" | "model";
  parts: MessagePart[];
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const historyMessage: MessageHistory[] = [];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const message: string | null = searchParams.get("message");

    if (!message) {
      return new Response("No message provided", { status: 400 });
    }

    historyMessage.push({
      role: "user",
      parts: [{ text: message }],
    });
    console.log("nextpremessage");

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: historyMessage,
    });

    const stream = await chat.sendMessageStream({ message });

    //SSE 응답 설정
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        let responseText = "";
        for await (const chunk of stream) {
          responseText += chunk.text;
          if (chunk.text) {
            for (const char of chunk.text) {
              controller.enqueue(encoder.encode(`data: ${char}\n\n`));
              await new Promise((res) => setTimeout(res, 50));
            }
          }
        }
        controller.enqueue(encoder.encode(`event: end\ndata: done\n\n`));
        historyMessage.push({
          role: "model",
          parts: [{ text: responseText }],
        });
        controller.close();
      },
    });

    console.log("nextresponse");
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    );
  }
}
