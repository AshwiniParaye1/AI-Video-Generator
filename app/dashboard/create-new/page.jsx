"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";

function CreateNew() {
  const [formData, setFormData] = useState([]);

  const handleInputChange = (fieldName, fieldValue) => {
    console.log(" Value==", fieldValue);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={handleInputChange} />

        {/* select style */}
        {/* duration */}
        {/* create button */}
      </div>
    </div>
  );
}

export default CreateNew;
