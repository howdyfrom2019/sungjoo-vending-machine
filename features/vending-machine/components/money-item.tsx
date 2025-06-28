"use client";

import { ReactNode } from "react";

interface MoneyItemProps {
  value: number;
  isToy?: boolean;
  children: ReactNode;
  className?: string;
}

export default function MoneyItem({
  value,
  isToy = false,
  children,
  className = "",
}: MoneyItemProps) {
  const handleDragStart = (e: React.DragEvent) => {
    const dragData = {
      value: value,
      isToy: isToy,
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`cursor-grab active:cursor-grabbing p-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ${className} ${
        isToy ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"
      }`}
    >
      {children}
    </div>
  );
}
