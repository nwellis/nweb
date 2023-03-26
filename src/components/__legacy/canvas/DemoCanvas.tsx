import React, { useMemo } from "react";
import clsx from "clsx";
import Phaser from "phaser";
import BaseCanvas, {
  BaseCanvasProps,
} from "components/__legacy/canvas/BaseCanvas";
import DemoScene from "components/game/demo/DemoScene";

export type DemoCanvasProps = Omit<BaseCanvasProps, "id" | "config">;

function DemoCanvas({ className, ...rest }: DemoCanvasProps) {
  const config = useMemo<Phaser.Types.Core.GameConfig>(
    () => ({
      type: Phaser.AUTO,
      scene: new DemoScene(),
      scale: DemoScene.Scaling,
      transparent: false,
      // backgroundColor: "#00FF00",
    }),
    []
  );

  return (
    <BaseCanvas
      id="demo-canvas"
      className={clsx(className, "flex flex-col")}
      config={config}
      {...rest}
    />
  );
}

export default DemoCanvas;
