import React from "react";
import clsx from "clsx";
import Phaser from "phaser";
import BaseCanvas, { BaseCanvasProps } from "./BaseCanvas";
import DemoScene from "../demo/DemoScene";

export const DemoCanvasConfig: Phaser.Types.Core.GameConfig = {
  scale: DemoScene.Scaling,
  transparent: false,
  // backgroundColor: "#00FF00",
  type: Phaser.AUTO,
};

export type DemoCanvasProps = {} & Omit<BaseCanvasProps, "id" | "config">;

function DemoCanvas({ className, ...rest }: DemoCanvasProps) {
  return (
    <BaseCanvas
      id="demo-canvas"
      className={clsx(className, "flex flex-col")}
      config={DemoCanvasConfig}
      {...rest}
    />
  );
}

export default DemoCanvas;
