
import { cn } from "@/lib/utils";
import React from "react";

interface HealthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  indicatorColor?: "green" | "yellow" | "red" | "blue" | "gray";
  compact?: boolean;
  children?: React.ReactNode;
}

export function HealthCard({
  title,
  icon,
  indicatorColor = "gray",
  compact = false,
  className,
  children,
  ...props
}: HealthCardProps) {
  const colorMap = {
    green: "bg-health-green",
    yellow: "bg-health-yellow",
    red: "bg-health-red",
    blue: "bg-health-blue",
    gray: "bg-apple-gray"
  };

  return (
    <div 
      className={cn(
        "ios-card transition-transform hover:translate-y-[-2px] animate-fade-in", 
        compact ? "p-4" : "p-5",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 mb-3">
        {indicatorColor && (
          <div className={cn("h-3 w-3 rounded-full", colorMap[indicatorColor])} />
        )}
        {icon && <div className="text-apple-gray">{icon}</div>}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
