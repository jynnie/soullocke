export function getLastItem<T>(arr: T[]) {
  return arr?.slice(-1)?.[0];
}
