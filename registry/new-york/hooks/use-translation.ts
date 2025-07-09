/**
 * Replace with your own translation function
 *
 * @param namespace
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useTranslation(namespace: string = "translation") {
  return (
    key: string,
    options:
      | {
          defaultMessage: string;
          [key: string]: string | number | undefined;
        }
      | string
  ) => {
    console.log(
      "Please replace useTranslation with your own translation function @/hooks/use-translation.ts",
      namespace
    );
    return typeof options === "string"
      ? options
      : options?.defaultMessage || key;
  };
}
