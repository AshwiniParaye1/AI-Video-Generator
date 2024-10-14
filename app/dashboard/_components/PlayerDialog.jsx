import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrames, setDurationInFrames] = useState(100);

  const router = useRouter();

  useEffect(() => {
    setOpenDialog(!openDialog);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    console.log("result", result);

    setVideoData(result[0]);
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl my-5">
            Your video is ready!
          </DialogTitle>
          <DialogDescription>
            {videoData && (
              <Player
                key={videoId}
                component={RemotionVideo}
                durationInFrames={Number(durationInFrames.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  script: videoData.script,
                  audioFileUrl: videoData.audioFileUrl,
                  captions: videoData.captions,
                  imageList: videoData.imageList,
                  setDurationInFrames: setDurationInFrames
                }}
              />
            )}
          </DialogDescription>
          {/* Div moved outside of DialogDescription to avoid HTML hierarchy issue */}
          <div className="flex justify-between mt-2 cursor-pointer">
            <Button
              variant="ghost"
              onClick={() => {
                router.replace("/dashboard");
                setOpenDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="outline">Export</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
