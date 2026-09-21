import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://unwritten-rebel-clay.ngrok-free.dev/webhook/9edb86d9-95f6-4b18-a373-834f708046b1/chat";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const chatInput = typeof body?.chatInput === "string" ? body.chatInput : null;
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId : null;

  if (!chatInput || !sessionId) {
    return NextResponse.json(
      {
        error: "invalid_request",
        message: "chatInput and sessionId are required.",
      },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput, sessionId, action: "sendMessage" }),
    });

    const data = await upstream.json().catch(() => null);

    if (!data) {
      return NextResponse.json(
        {
          error: "upstream_error",
          message: "The coach didn't return a usable response. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json(
      {
        error: "upstream_unreachable",
        message: "Couldn't reach the coach right now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
