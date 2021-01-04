export const oVal = Object.values;

export const oKey = Object.keys;

export const cleanName = (name: string = "") => name.replace(/(_|-)/g, " ");

export default { oVal, oKey, cleanName };
