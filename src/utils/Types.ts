type Lit = string | number | boolean | undefined | null | void | {};
export const tuple = <T extends Lit[]>(...args: T) => args;

export type RecordKey = string | number | symbol;

export function mkConfig<
  TConfig extends Record<RecordKey, any>,
  TKey extends keyof TConfig
>(keyField: TKey, ...entries: TConfig[]) {
  return entries.reduce((config, entry) => {
    config[entry[keyField]] = entry;
    return config;
  }, {} as Record<TConfig[TKey], TConfig>);
}
