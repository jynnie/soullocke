import type { ReactNode } from "react";

export function TimelineBullet({
  children,
  dot,
  color,
}: {
  children: ReactNode;
  dot: ReactNode;
  color?: string;
}) {
  return (
    <li className="timelineItem flex gap-4">
      <div className="timelineItem-dot flex center" style={{ color }}>
        {dot}
      </div>
      <div>{children}</div>
    </li>
  );
}
