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
      image: "/comics.jpeg"
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
    <div className="mt-7">
      <h2 className="font-bold text-2 xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3 ">
        {styleOptions.map((item, index) => (
          <div className="relative">
            <Image
              key={index}
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
            />
            <h2 className="absolute p-1 bg-black  text-white text-center rounded-b-lg bottom-0 w-full">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
