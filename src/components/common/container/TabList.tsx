import * as React from "react";
import clsx from "clsx";

export type TabListProps = {
  tabs: React.ReactNode[];
  defaultIndex?: number;
  tabIndex?: number;
  onChange?: (index: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

function TabList({
  tabs,
  defaultIndex = 0,
  tabIndex,
  onChange,

  className,
  children,
  ...rest
}: TabListProps) {
  const isControlled = tabIndex !== undefined;
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
  const selected = isControlled ? tabIndex : internalIndex;

  const mkHandleSelected = (index: number) => () => {
    onChange?.(index);
    !isControlled && setInternalIndex(index);
  };

  return (
    <div className={clsx(className, "flex flex-col")} {...rest}>
      <div className={clsx("flex flex-row justify-center content-center")}>
        {tabs.map((tab, i) => {
          return (
            <button key={`store-tab-${i}`} onClick={mkHandleSelected(i)}>
              {tab}
            </button>
          );
        })}
      </div>
      {React.Children.toArray(children)[selected]}
    </div>
  );
}

export default TabList;
