export const regex = new RegExp('^[A-Za-z0-9?!.,"\'\\s]*$');
export const hasInputValidation = (val) => regex.test(val);
