"use client"


export default function Skeleton() {
  return (
    <div className="animate-pulse border rounded p-4 max-w-xs">
      <div className="bg-gray-300 h-40 w-full mb-4 rounded"></div>
      <div className="h-6 bg-gray-300 rounded mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}