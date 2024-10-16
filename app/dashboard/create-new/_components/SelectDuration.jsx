"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function SelectDuration({ onUserSelect }) {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2 xl text-primary">Duration</h2>
      <p className="text-gray-500">Select the duration of the video.</p>
      <Select
        onValueChange={(value) => {
          value !== "Custom Story Prompt" && onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15 Seconds">15 Seconds</SelectItem>
          <SelectItem value="30 Seconds">30 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
