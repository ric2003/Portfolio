"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 px-2 py-1">
        <Monitor size={22} />
        <span className="text-xs font-medium whitespace-nowrap">Theme</span>
      </div>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={22} />;
      case "dark":
        return <Moon size={22} />;
      default:
        return <Monitor size={22} />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System";
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center gap-1 px-2 py-1 cursor-pointer transition-all duration-300"
      onClick={cycleTheme}
    >
      <div className="transition-transform duration-300 hover:scale-110">
        {getIcon()}
      </div>
      <span className="text-xs font-medium whitespace-nowrap">{getLabel()}</span>
    </div>
  );
} 