import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

interface ButtonBorderBeamProps {
  text: string;
  size: "sm" | "md" | "lg" | "xl";
  onClick: () => void;
}

export function ButtonBorderBeam({ text, size, onClick }: ButtonBorderBeamProps) {
  return (
    <PulsatingButton size={size} onClick={onClick}>{text}</PulsatingButton>
  );
}
