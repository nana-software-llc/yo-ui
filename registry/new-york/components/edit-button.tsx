import { Button, buttonVariants } from "@/registry/new-york/ui/button";
import { useTranslation } from "@/registry/new-york/hooks/use-translation";
import { VariantProps } from "class-variance-authority";
import { ButtonTooltipWrapper } from "./button-tooltip-wrapper";

export default function EditButton({
  variant = "secondary",
  tooltip,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    tooltip?: string;
  }) {
  const t = useTranslation();

  if (tooltip) {
    return (
      <ButtonTooltipWrapper title={tooltip}>
        <Button variant={variant} {...props}>
          {children || t("button.edit", "Edit")}
        </Button>
      </ButtonTooltipWrapper>
    );
  }

  return (
    <Button variant={variant} {...props}>
      {children || t("button.edit", "Edit")}
    </Button>
  );
}
