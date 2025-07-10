import { ComponentType } from "react";
import type { RegistryItem } from "shadcn/registry";

interface ComponentLoaderProps {
  component: RegistryItem;
}

export default async function ComponentLoader<TProps extends object>({
  component,
  ...props
}: ComponentLoaderProps & TProps) {
  if (!component?.name) {
    return null;
  }

  try {
    const Component = (
      await import(`@/registry/new-york/components/${component.name}`)
    ).default as ComponentType<TProps>;

    return <Component {...(props as TProps)} />;
  } catch (error) {
    console.error(`Failed to load component ${component.name}:`, error);
    return null;
  }
}
