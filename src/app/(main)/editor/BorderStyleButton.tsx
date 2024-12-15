import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onBorderStyleChange: (borderStyle: string) => void;
}

export const BorderStyle = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyle);

export const BorderStyleButton = ({
  borderStyle,
  onBorderStyleChange,
}: BorderStyleButtonProps) => {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onBorderStyleChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon />
    </Button>
  );
};
