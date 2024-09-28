export const validateField = (
  fieldValue: string | number | File[],
  fieldName: string
): string => {
  if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
    return `O campo '${fieldName}' é obrigatório e deve ser preenchido.\n`;
  }
  return "";
};
