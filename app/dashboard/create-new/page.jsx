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
  const [playVideo, setPlayVideo] = useState(false); // changed to false initially
  const [videoId, setVideoId] = useState(1);

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { user } = useUser();

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue
    }));
  };

  const onCreateClickHandler = () => {
    if (!formData.topic || !formData.imageStyle || !formData.duration) {
      toast.error("Please fill in all fields!"); // Validate input on mobile
      return;
    }

    if (userDetails?.credits === 0) {
      toast.error(
        "Oops! You don't have enough credits to create a new video🙁"
      );
      return;
    }

    GetVideoScript();
  };

  // Get video script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with Al image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, no plain text`;

    try {
      const res = await axios.post("/api/get-video-script", { prompt });
      const scriptData = res.data.result;

      if (!scriptData || scriptData.length === 0) {
        throw new Error("Script generation failed");
      }

      setVideoData((prev) => ({ ...prev, videoScript: scriptData }));
      setVideoScript(scriptData);
      await GenerateAudioFile(scriptData);
    } catch (error) {
      console.error("Error fetching video script:", error);
      toast.error("Failed to generate video script, please try again!");
      setLoading(false);
    }
  };

  // Generate audio file and save in Firebase storage
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";

    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script += item.contentText + " ";
    });

    try {
      const res = await axios.post("/api/generate-audio", { text: script, id });
      const audioUrl = res.data.result;

      if (!audioUrl) throw new Error("Audio generation failed");

      setVideoData((prev) => ({ ...prev, audioFileUrl: audioUrl }));
      setAudioFileUrl(audioUrl);

      if (audioUrl) {
        await GenerateAudioCaption(audioUrl, videoScriptData);
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast.error("Failed to generate audio file.");
      setLoading(false);
    }
  };

  // Generate caption from audio file
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl
      });
      const captionsData = res.data.result;

      if (!captionsData) throw new Error("Caption generation failed");

      setVideoData((prev) => ({ ...prev, captions: captionsData }));
      setCaptions(captionsData);
      await GenerateImage(videoScriptData);
    } catch (error) {
      console.error("Error generating captions:", error);
      toast.error("Failed to generate captions.");
      setLoading(false);
    }
  };

  // Generate image
  const GenerateImage = async (videoScriptData) => {
    setLoading(true);

    const imagePromises = videoScriptData.map(async (element) => {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt
        });
        return res.data.result;
      } catch (error) {
        console.error("Error generating image:", error);
        toast.error("Failed to generate image.");
        return null; // Handle error gracefully
      }
    });

    try {
      const images = await Promise.all(imagePromises);
      const filteredImages = images.filter(Boolean); // Remove null values
      if (filteredImages.length === 0)
        throw new Error("Image generation failed");

      setVideoData((prev) => ({ ...prev, imageList: filteredImages }));
      setImageList(filteredImages);
    } catch (error) {
      console.error("Error collecting image results:", error);
      toast.error("Image generation failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoData && Object.keys(videoData).length === 4) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    try {
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
      setPlayVideo(true); // Enable video play
      toast.success("Video created successfully!");
    } catch (error) {
      console.error("Error saving video data:", error);
      toast.error("Failed to save video data.");
    } finally {
      setLoading(false);
    }
  };

  const UpdateUserCredits = async () => {
    try {
      await db
        .update(Users)
        .set({ credits: userDetails?.credits - 10 })
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

      setUserDetails((prev) => ({
        ...prev,
        credits: userDetails?.credits - 10
      }));

      setVideoData(null); // Reset videoData
    } catch (error) {
      console.error("Error updating user credits:", error);
      toast.error("Failed to update user credits.");
    }
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
