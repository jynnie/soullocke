import classNames from "classnames";
import React from "react";

export function TooltipContent({
  className,
  content,
  children,
}: {
  className?: string;
  content?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={classNames(className, "tooltipContent")}>
      {content}
      {children}
    </div>
  );
}
