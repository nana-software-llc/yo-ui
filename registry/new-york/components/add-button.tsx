import { Button, buttonVariants } from "@/registry/new-york/ui/button";
import { useTranslation } from "@/registry/new-york/hooks/use-translation";
import { VariantProps } from "class-variance-authority";
import { ButtonTooltipWrapper } from "./button-tooltip-wrapper";

export default function AddButton({
  variant = "default",
  tooltip,
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
          {t("button.add", "Add new")}
        </Button>
      </ButtonTooltipWrapper>
    );
  }

  return (
    <Button variant={variant} {...props}>
      {t("button.add", "Add new")}
    </Button>
  );
}
