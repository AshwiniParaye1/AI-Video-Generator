"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";

function CreateNew() {
  const [formData, setFormData] = useState([]);

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
    GetVideoScript();
  };
  //get video script
  const GetVideoScript = async () => {
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic : " +
      formData.topic +
      " along with Al image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text";

    console.log("prompt===", prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt
      })
      .then((res) => {
        console.log("res===", res.data);
      });
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
    </div>
  );
}

export default CreateNew;
