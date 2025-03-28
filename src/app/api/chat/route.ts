import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await axios.post("https://api.example.com/chat", {
      prompt: message,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    );
  }
}
