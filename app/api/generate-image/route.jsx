import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { storage } from "../../../configs/FirebaseConfig";

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
          prompt: prompt.prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4
        }
      }
    );
    //save to firebase
    const base64Image =
      "data:image/png;base64," + (await ConvertUrlToImage(output[0]));

    const fileName = "ai-short-video-files/" + Date.now() + ".png";

    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, "data_url");

    const downloadUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ "Error ": error });
  }
}

const ConvertUrlToImage = async (imageUrl) => {
  try {
    const res = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const base64Image = Buffer.from(res.data).toString("base64");

    return base64Image;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ "Error ": error });
  }
};
