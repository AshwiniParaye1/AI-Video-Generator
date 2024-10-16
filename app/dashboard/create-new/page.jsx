"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(1);

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { user } = useUser();

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fieldName]: fieldValue
      };
    });
  };

  const onCreateClickHandler = () => {
    if (userDetails?.credits === 0) {
      toast("Oops! You don't have enough credits to create a new video🙁");

      return;
    }
    GetVideoScript();
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

    await axios
      .post("/api/get-video-script", {
        prompt: prompt
      })
      .then(async (res) => {
        setVideoData((prev) => ({ ...prev, videoScript: res.data.result }));

        setVideoScript(res.data.result);

        await GenerateAudioFile(res.data.result);
      });
  };

  //generate audio file and save in firebase storage
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
      .then(async (res) => {
        setVideoData((prev) => ({ ...prev, audioFileUrl: res?.data?.result }));

        setAudioFileUrl(res?.data?.result);
        res.data.result &&
          (await GenerateAudioCaption(res.data.result, videoScriptData));
      });
  };

  //generate caption from audio file
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);

    await axios
      .post("/api/generate-caption", {
        audioFileUrl: fileUrl
      })
      .then(async (res) => {
        setVideoData((prev) => ({ ...prev, captions: res.data.result }));

        setCaptions(res?.data?.result);

        res.data.result && (await GenerateImage(videoScriptData));
      });
  };

  //generate image
  const GenerateImage = async (videoScriptData) => {
    let images = [];

    for (const element of videoScriptData) {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt
        });

        images.push(res.data.result);
      } catch (error) {
        console.log(error);
        return NextResponse.json({ "Error ": error });
      }
    }
    setVideoData((prev) => ({ ...prev, imageList: images }));

    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(videoData).length === 4) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user.primaryEmailAddress?.emailAddress
      })
      .returning({ id: VideoData.id });

    await UpdateUserCredits();
    setVideoId(result[0].id);
    setPlayVideo(true);
    console.log(result);

    setLoading(false);
  };

  const UpdateUserCredits = async () => {
    await db
      .update(Users)
      .set({ credits: userDetails?.credits - 10 })
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetails((prev) => ({ ...prev, credits: userDetails?.credits - 10 }));

    setVideoData(null);
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

      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
}

export default CreateNew;
