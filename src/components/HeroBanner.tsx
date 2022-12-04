import * as React from "react";
import clsx from "clsx";

function Line({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(className, "h-0.5 bg-accent")} />;
}

function Curve({
  corner,
  className,
}: React.HTMLAttributes<HTMLDivElement> & {
  corner: "tl" | "tr" | "br" | "bl";
}) {
  return (
    <div
      className={clsx(
        className,
        "border-accent",
        corner === "tl" && "border-l-2 rounded-tl-full",
        corner === "tr" && "border-r-2 rounded-tr-full",
        corner === "br" && "border-r-2 rounded-br-full",
        corner === "bl" && "border-l-2 rounded-bl-full"
      )}
    />
  );
}

function Node({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(className, "flex flex-row justify-center items-center")}
    >
      <div className="w-4 h-4 border-4 border-accent rounded-full" />
      <Line className="flex-1" />
    </div>
  );
}

export type HeroBannerProps = {} & React.HTMLAttributes<HTMLDivElement>;

function HeroBanner({ className, ...rest }: HeroBannerProps) {
  return (
    <div
      className={clsx(
        className,
        "h-36 text-3xl grid grid-rows-3 grid-cols-[auto_2rem_6rem_2rem_6rem_auto]"
      )}
      {...rest}
    >
      {/** Col 1 */}
      <div className="col-start-1 row-start-1 row-end-4 flex flex-col justify-center px-4">
        <h1 className="text-5xl text-right font-mono">
          Nick
          <br />
          Ellis
        </h1>
      </div>

      {/** Col 2 */}
      <Node className="col-start-2 row-start-1 row-end-4 flex-row" />

      {/** Col 3 */}
      <div className="col-start-3 row-start-2 flex flex-col">
        <Curve corner="br" className="flex-1 -mr-0.5" />
        <Line className="col-start-3 row-start-2 h-0.5 bg-accent" />
        <Curve corner="tr" className="flex-1 -mr-0.5" />
      </div>

      {/** Col 4 */}
      <div className="col-start-4 row-start-1 flex flex-col">
        <div className="flex-1" />
        <Curve corner="tl" className="flex-1 border-t-2" />
      </div>
      <Line className="col-start-4 row-start-2 self-center" />
      <div className="col-start-4 row-start-3 flex flex-col">
        <Curve corner="bl" className="flex-1 border-b-2" />
        <div className="flex-1" />
      </div>

      {/** Col 5 */}
      <Node className="col-start-5 row-start-1 flex-row-reverse" />
      <Node className="col-start-5 row-start-2 flex-row-reverse" />
      <Node className="col-start-5 row-start-3 flex-row-reverse" />

      {/** Col 6 */}
      <h2 className="col-start-6 row-start-1 px-4 self-center">React</h2>
      <h2 className="col-start-6 row-start-2 px-4 self-center">Android</h2>
      <h2 className="col-start-6 row-start-3 px-4 self-center">Node</h2>
    </div>
  );
}

export default HeroBanner;
