import { NextResponse } from "next/server";
import { chatSession } from "../../../configs/AIModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const result = await chatSession.sendMessage(prompt);

    return NextResponse.json({ result: JSON.parse(result.response.text()) });
  } catch (error) {
    NextResponse.json({ "Error ": error });
  }
}
