import { Button, buttonVariants } from "@/registry/new-york/ui/button";
import { useTranslation } from "@/registry/new-york/hooks/use-translation";
import { VariantProps } from "class-variance-authority";
import { PencilIcon } from "lucide-react";
import { ButtonTooltipWrapper } from "./button-tooltip-wrapper";

export default function EditButtonIcon({
  variant = "secondary",
  size = "icon",
  icon = <PencilIcon className="w-4 h-4" />,
  tooltip,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    tooltip?: string;
    icon?: React.ReactNode;
  }) {
  const t = useTranslation();

  if (tooltip) {
    return (
      <ButtonTooltipWrapper title={tooltip || t("button.edit", "Edit")}>
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
