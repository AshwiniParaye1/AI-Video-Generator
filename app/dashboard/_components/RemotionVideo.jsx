import React from "react";
import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";

function RemotionVideo({ script, audioFileUrl, captions, imageList }) {
  const { fps } = useVideoConfig();

  console.log("captions", captions);

  const getDurationFrames = () => {
    console.log("captions", captions);
    console.log("captions", fps);

    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((image, index) => (
        <>
          <Sequence
            key={index}
            from={(index * getDurationFrames()) / imageList.length}
            durationInFrames={getDurationFrames()}
          >
            <Img
              src={image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Sequence>
        </>
      ))}
    </AbsoluteFill>
  );
}

export default RemotionVideo;
