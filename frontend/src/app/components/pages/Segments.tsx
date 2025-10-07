"use client"

import React, { useState } from "react";
import { FilterConditions } from "@/app/components/FilterConditions"; // your main filter UI
import { PrettyJsonViewer } from "@/app/components/PrettyJsonViewer";
import { SEGMENTS_API_URL } from "@/app/config/config"

export default function SegmentsPage() {
  const [result, setResult] = useState<any>(null);
  
  const handleEvaluate = async (conditions: string[]) => {
    const resp = await fetch(SEGMENTS_API_URL+"/api/segments/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conditions }),
    });
    if (!resp.ok) throw new Error("Failed to evaluate");
    setResult(await resp.json());
  };

  return (
    <div className="flex gap-2 p-5">
      <FilterConditions onEvaluate={handleEvaluate} />
      {result && (
        <div>
          
          <PrettyJsonViewer data={result} />
        </div>
      )}
    </div>
  );
}
