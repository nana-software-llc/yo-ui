export interface ComponentCategory {
  slug: string;
  name: string;
  components: { name: string }[];
  isNew?: boolean;
}

export const categories: ComponentCategory[] = [
  {
    slug: "button",
    name: "Button",
    components: [
      { name: "add-button-icon" },
      { name: "add-button" },
      { name: "delete-button-icon" },
      { name: "delete-button" },
      { name: "edit-button-icon" },
      { name: "edit-button" },
    ],
  },
];

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}
