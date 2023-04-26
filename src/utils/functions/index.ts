export const truncateText = (text: string, maxLength = 50) => {
  return text?.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const removedFamilyName = (name: string) => {
  const lastIndex = name.lastIndexOf(" ");
  return name.substring(0, lastIndex);
};