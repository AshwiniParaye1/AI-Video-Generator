import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig
} from "remotion";

function RemotionVideo({
  script,
  audioFileUrl,
  captions,
  imageList,
  setDurationInFrames
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  console.log("captions", captions);

  const getDurationFrames = () => {
    console.log("inside getDurationFrames", captions);

    setDurationInFrames((captions[captions?.length - 1]?.end / 1000) * fps);

    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // convert frame to seconds
    const currentCaption = captions.find((word) => {
      return word.start <= currentTime && word.end >= currentTime;
      return currentCaption ? currentCaption?.text : "";
    });
  };

  return (
    script && (
      <AbsoluteFill className="bg-black">
        {imageList?.map((image, index) => (
          <>
            <Sequence
              key={index}
              from={(index * getDurationFrames()) / imageList.length}
              durationInFrames={getDurationFrames()}
            >
              <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={image}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    top: undefined,
                    height: 150,
                    bottom: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    textAlign: "center",
                    width: "100%"
                  }}
                >
                  <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          </>
        ))}

        <Audio src={audioFileUrl} />
      </AbsoluteFill>
    )
  );
}

export default RemotionVideo;
