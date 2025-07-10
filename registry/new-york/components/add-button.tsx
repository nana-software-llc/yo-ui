import { Button } from "@/registry/new-york/ui/button";
import { useTranslation } from "@/registry/new-york/hooks/use-translation";

export default function AddButton(props: React.ComponentProps<"button">) {
  const t = useTranslation();
  return <Button {...props}>{t("button.add", "Add new")}</Button>;
}
