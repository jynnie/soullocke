import React from "react";

export function TooltipContent({
  content,
  children,
}: {
  content?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="tooltipContent">
      {content}
      {children}
    </div>
  );
}
