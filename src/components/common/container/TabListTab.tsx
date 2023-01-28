import * as React from "react";
import clsx from "clsx";

export type TabListTabProps = {
  active?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

function TabListTab({
  active = false,

  className,
  children,
  ...rest
}: TabListTabProps) {
  return (
    <button
      className={clsx(
        className,
        "bg-gray-darker border border-gray rounded-md select-none"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default TabListTab;
