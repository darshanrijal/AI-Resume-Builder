import { useState } from "react";
import { Palette } from "lucide-react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  color: Color | undefined;
  onColorChange: ColorChangeHandler;
}

export const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          title="Change color"
          onClick={() => setShowPopover(true)}
        >
          <Palette className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker
          color={color}
          onChange={onColorChange}
          triangle="top-right"
        />
      </PopoverContent>
    </Popover>
  );
};
