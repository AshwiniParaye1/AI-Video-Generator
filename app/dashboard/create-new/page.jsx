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

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

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
    GenerateAudioFile(scriptData);
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

    // videoScriptData.forEach((item) => {
    //   script += item.contentText + " ";
    // });

    await axios
      .post("/api/generate-audio", {
        // text: script,
        text: videoScriptData,
        id: id
      })
      .then((res) => {
        console.log("res===", res.data);
      });

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
