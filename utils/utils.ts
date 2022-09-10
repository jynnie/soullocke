export const oVal = Object.values;

export const oKey = Object.keys;

export const cleanName = (name: string = "") => name.replace(/(_|-)/g, " ");

export const isNullish = (v: any) => {
  const random = Math.random();
  return (v ?? random) === random;
};

/**
 * hashString & colorize credits go to
 * https://stackoverflow.com/questions/11120840/hash-string-into-rgb-color
 */
export const hashString = (str: string): number => {
  if (!str) return 0;

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export const colorize = (str: string) => {
  const hash = hashString(str);
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return (
    "#" +
    ("0" + r.toString(16)).substr(-2) +
    ("0" + g.toString(16)).substr(-2) +
    ("0" + b.toString(16)).substr(-2)
  );
};

export const alpha = (number: number) => {
  return ("0" + Math.round(number * 255).toString(16)).substr(-2);
};

export const utils = {
  oVal,
  oKey,
  cleanName,
  isNullish,
  hashString,
  colorize,
  alpha,
};
export default utils;