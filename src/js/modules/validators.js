const regex = new RegExp('^[A-Za-z0-9?!.,"\'\\s]*$');

export const hasInputValidate = (val) => regex.test(val);
export const hasSimbol = (val) => /[!"?,'.-]/.test(val);
