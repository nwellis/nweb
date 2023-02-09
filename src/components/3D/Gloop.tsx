import * as React from "react";
import clsx from "clsx";

export type GloopProps = {
} & React.HTMLAttributes<HTMLDivElement>;

function Gloop({ className, ...rest }: GloopProps) {
  return (
    <div className={clsx(className, "flex flex-col")} {...rest}>
      Gloop
    </div>
  )
}

export default Gloop;
