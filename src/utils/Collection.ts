export function mapValues<T extends object, TResult>(
  obj: T,
  callback: (t: T[keyof T], key: keyof T) => TResult
) {
  return Object.keys(obj).reduce((mapped, key) => {
    mapped[key] = callback(obj[key], key as keyof T);
    return mapped;
  }, {} as { [P in keyof T]: TResult });
}
