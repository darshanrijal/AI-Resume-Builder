import { useState } from "react";
import { Palette } from "lucide-react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSubscriptionLevel } from "../SubscriptionLevelCtx";
import { usePremiumModal } from "@/hooks/use-premium-modal";
import { canUseCustomization } from "@/lib/permissions";

interface ColorPickerProps {
  color: Color | undefined;
  onColorChange: ColorChangeHandler;
}

export const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          title="Change color"
          onClick={() => {
            if (!canUseCustomization(subscriptionLevel)) {
              premiumModal.setOpen(true);
              return;
            }
            setShowPopover(true);
          }}
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
