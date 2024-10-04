"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";

function CreateNew() {
  const [formData, setFormData] = useState([]);

  const handleInputChange = (fieldName, fieldValue) => {
    console.log(" Value==", fieldValue);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fieldName]: fieldValue
      };
    });
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

        {/* create button */}
      </div>
    </div>
  );
}

export default CreateNew;
