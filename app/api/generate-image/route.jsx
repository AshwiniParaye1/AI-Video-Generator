import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const prompt = await req.json();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    });

    const input = {};

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          width: 1024,
          height: 1280,
          prompt:
            "Imagine a world without wheels. That's what our ancestors lived with. Ancient civilizations built empires, invented writing, and shared knowledge. From knights and castles to the rise of powerful kingdoms, history is full of fascinating stories. The pursuit of knowledge and discovery has driven human progress for centuries. History connects us to our past and shapes our future. By studying history, we gain valuable insights into ourselves and the world around us.",
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4
        }
      }
    );
    console.log("output===", output);

    return NextResponse.json({ result: output[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ "Error ": error });
  }
}
