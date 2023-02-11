import React from "react";
import clsx from "clsx";
import { BaseCanvasProps } from "./canvas/BaseCanvas";

const Canvas = {
  Demo: React.lazy(() => import("components/game/canvas/DemoCanvas")),
};
export type LazyLoadCanvasKey = keyof typeof Canvas;

export type LazyLoadCanvasProps = {
  canvas: LazyLoadCanvasKey;
  fallback?: React.ReactNode;
} & Partial<BaseCanvasProps>;

const Loading = () => (
  <h2 className="font-mono text-4xl animate-pulse">Loading…</h2>
);
const TODO = () => <h2 className="font-mono text-2xl">TODO: Make a game</h2>;

function LazyLoadCanvas({
  canvas,
  fallback,
  className,
  ...rest
}: LazyLoadCanvasProps) {
  const LazyCanvas = Canvas[canvas];
  return (
    <React.Suspense fallback={fallback || <Loading />}>
      <TODO />
      {/* <LazyCanvas className={clsx(className, "flex flex-col")} {...rest} /> */}
    </React.Suspense>
  );
}

export default LazyLoadCanvas;
