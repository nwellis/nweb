import * as React from "react";
import clsx from "clsx";

export type TabListProps = {
  childRender?: "all" | "active";
  tabs: React.ReactNode[];
  defaultIndex?: number;
  tabIndex?: number;
  onChange?: (index: number) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

function TabList({
  childRender = "all",
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
      <div className={clsx("flex flex-wrap justify-center content-center")}>
        {tabs.map((tab, i) => {
          return (
            <button key={`store-tab-${i}`} onClick={mkHandleSelected(i)}>
              {tab}
            </button>
          );
        })}
      </div>
      {childRender === "all" && children}
      {childRender === "active" && React.Children.toArray(children)[selected]}
    </div>
  );
}

export default TabList;
