import * as React from "react";
import clsx from "clsx";

export type GloopProps = {} & React.HTMLAttributes<HTMLDivElement>;

function Gloop({ className, ...rest }: GloopProps) {
  return (
    <div className={clsx(className, "flex flex-col")} {...rest}>
      TODO: Make a gloop animation to jazz things up
    </div>
  );
}

export default Gloop;
