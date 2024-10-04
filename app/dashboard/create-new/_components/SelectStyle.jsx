import Image from "next/image";
import React from "react";

function SelectStyle() {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpeg"
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpeg"
    },
    {
      name: "Comic",
      image: "/comic.jpeg"
    },
    {
      name: "WaterColor",
      image: "/water-color.jpeg"
    },
    {
      name: "GTA",
      image: "/gta.jpeg"
    }
  ];

  return (
    <div>
      <h2 className="font-bold text-2 xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div>
        {styleOptions.map((item, index) => (
          <Image
            key={index}
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
