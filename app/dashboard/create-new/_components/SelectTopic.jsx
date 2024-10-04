"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function SelectTopic() {
  const options = [
    "Custom Story Prompt",
    "Generate Random AI Story",
    "Scary Story",
    "Historical Insights",
    "Bedtime Story",
    "Motivational Message",
    "Fun Facts"
  ];

  return (
    <div>
      <h2 className="font-bold text-2 xl text-primary">Content</h2>
      <p className="text-gray-500">
        What kind of video would you like to create?
      </p>
      <Select>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectTopic;
