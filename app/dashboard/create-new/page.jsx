"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

//FOR TEST
const scriptData =
  "Imagine a world without wheels. That's what our ancestors lived with. Ancient civilizations built empires, invented writing, and shared knowledge. From knights and castles to the rise of powerful kingdoms, history is full of fascinating stories. The pursuit of knowledge and discovery has driven human progress for centuries. History connects us to our past and shapes our future. By studying history, we gain valuable insights into ourselves and the world around us.";

const FileUrl =
  "https://firebasestorage.googleapis.com/v0/b/ai-video-generator-f17f5.appspot.com/o/ai-short-video-files%2F%2B2f98fd63-8e32-4f9a-96a5-9cc3e1e3db0a.mp3?alt=media&token=0f58f42d-cbfb-44f5-b0d3-09dc38b900fa";

const VideoScriptData = [
  {
    imagePrompt:
      "A bustling medieval marketplace, full of colorful stalls and people haggling over goods. The sun is shining brightly and the air is filled with the sounds of chatter and bartering.",
    contentText:
      "In the heart of 14th century Florence, a young artist named Donatello was struggling to make ends meet. He was known for his talent, but his sculptures were often overlooked in the shadow of the city's established masters."
  }
];

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState([]);

  const handleInputChange = (fieldName, fieldValue) => {
    console.log(" Value==", fieldValue);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fieldName]: fieldValue
      };
    });
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    // GenerateAudioFile(scriptData);

    // GenerateAudioCaption(FileUrl);

    GenerateImage();
  };
  //get video script
  const GetVideoScript = async () => {
    setLoading(true);

    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic : " +
      formData.topic +
      " along with Al image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text";

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt
      })
      .then((res) => {
        setVideoScript(res.data.result);

        GenerateAudioFile(res.data.result);
      });

    setLoading(false);
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);

    let script = "";

    const id = uuidv4();

    videoScriptData.forEach((item) => {
      script += item.contentText + " ";
    });

    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id
      })
      .then((res) => {
        console.log("res===", res.data.res);
        setAudioFileUrl(res.data.result);
        res.data.result && GenerateAudioCaption(res.data.result);
      });

    setLoading(false);
  };

  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);

    await axios
      .post("/api/generate-caption", {
        audioFileUrl: fileUrl
      })
      .then((res) => {
        console.log("caption res===", res.data.result);
        setCaptions(res?.data?.result);

        GenerateImage();
      });
  };

  const GenerateImage = async () => {
    // videoScript.forEach(async (element) => {
    VideoScriptData.forEach(async (element) => {
      let images = [];

      await axios
        .post("/api/generate-image", {
          prompt: element?.imagePrompt
        })
        .then((res) => {
          console.log("image res===", res.data.result);

          images.push(res.data.result);
        });
    });

    setImageList(images);

    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={handleInputChange} />

        <SelectStyle onUserSelect={handleInputChange} />

        <SelectDuration onUserSelect={handleInputChange} />

        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Generate Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
