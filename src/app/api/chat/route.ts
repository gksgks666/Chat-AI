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

/* async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const stream1 = await chat.sendMessageStream({
    message: "I have 2 dogs in my house.",
  });
  for await (const chunk of stream1) {
    console.log(chunk.text);
    console.log("_".repeat(80));
  }

  const stream2 = await chat.sendMessageStream({
    message: "How many paws are in my house?",
  });
  for await (const chunk of stream2) {
    console.log(chunk.text);
    console.log("_".repeat(80));
  }
}

await main(); */

/* const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
        responseType: "stream",
      }
    ); */

/* curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }' */
