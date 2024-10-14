import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
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

  const getDurationFrames = () => {
    setDurationInFrames((captions[captions?.length - 1]?.end / 1000) * fps);

    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // convert frame to seconds
    const currentCaption = captions.find(
      (word) => word.start <= currentTime && word.end >= currentTime
    );
    return currentCaption ? currentCaption?.text : "";
  };

  return (
    script && (
      <AbsoluteFill className="bg-black">
        {imageList?.map((image, index) => {
          const startTime = (index * getDurationFrames()) / imageList.length;
          const duration = getDurationFrames();

          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration], //zoom in and out
              index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp"
              }
            );

          return (
            <>
              <Sequence
                key={index}
                from={startTime}
                durationInFrames={getDurationFrames()}
              >
                <AbsoluteFill
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Img
                    src={image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale(${scale(index)})`
                    }}
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
          );
        })}

        <Audio src={audioFileUrl} />
      </AbsoluteFill>
    )
  );
}

export default RemotionVideo;
