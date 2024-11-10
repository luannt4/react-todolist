import forms  from "../i18n/forms.json";
import errors from "../i18n/errors.json";

type FilePrefix = "forms" | "errors";

export const getTextFromKey = (key: string): string => {
  const [prefix, ...pathParts] = key.split(".");
  const fileKey = pathParts.join(".");

  let fileData: Record<string, any>;

  switch (prefix as FilePrefix) {
    case "forms":
      fileData = forms;
      break;
    case "errors":
      fileData = errors;
      break;
    default:
      console.warn(`Unknown prefix: ${prefix}`);
      return "";
  }

  const keys = fileKey.split("-");
  let text: any = fileData;

  for (const k of keys) {
    text = text?.[k];
  }

  return text || "";
};