"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function SelectTopic({ onUserSelect }) {
  const options = [
    "Custom Story Prompt",
    "Generate Random AI Story",
    "Scary Story",
    "Historical Insights",
    "Bedtime Story",
    "Motivational Message",
    "Fun Facts"
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div>
      <h2 className="font-bold text-2 xl text-primary">Content</h2>
      <p className="text-gray-500">
        What kind of video would you like to create?
      </p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value !== "Custom Story Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Story Prompt" && (
        <Textarea
          onChange={(e) => onUserSelect("topic", e.target.value)}
          className="mt-3"
          placeholder="Enter your prompt here..."
        />
      )}
    </div>
  );
}

export default SelectTopic;
