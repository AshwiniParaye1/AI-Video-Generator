import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../configs/FirebaseConfig";

const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
});

export async function POST(req) {
  const { text, id } = await req.json();

  const storageRef = ref(storage, `ai-short-video-files/+${id}.mp3`);

  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" }
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  const audioBuffer = Buffer.from(response.audioContent, "binary");

  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

  const downloadUrl = await getDownloadURL(storageRef);

  return NextResponse.json({ result: downloadUrl });
}
