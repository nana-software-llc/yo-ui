import { Button, buttonVariants } from "@/registry/new-york/ui/button";
import { useTranslation } from "@/registry/new-york/hooks/use-translation";
import { VariantProps } from "class-variance-authority";
import { PlusIcon } from "lucide-react";
import { ButtonTooltipWrapper } from "./button-tooltip-wrapper";
import { cn } from "@/lib/utils";

export default function AddButtonIcon({
  variant = "default",
  size = "icon",
  icon = <PlusIcon className="w-4 h-4" />,
  tooltip,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    tooltip?: string;
    icon?: React.ReactNode;
    rounded?: boolean;
  }) {
  const t = useTranslation();

  if (tooltip) {
    return (
      <ButtonTooltipWrapper title={tooltip}>
        <Button variant={variant} size={size} {...props}>
          {icon}
        </Button>
      </ButtonTooltipWrapper>
    );
  }

  return (
    <Button variant={variant} size={size} {...props}>
      {icon}
    </Button>
  );
}
