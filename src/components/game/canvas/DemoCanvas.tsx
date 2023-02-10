import * as React from "react";
import clsx from "clsx";
import * as Phaser from "phaser";
import BaseCanvas, { BaseCanvasProps } from "./BaseCanvas";

export const DemoCanvasConfig: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1080,
    height: 685,
    min: {
      width: 450,
      height: 295,
    },
    max: {
      width: 1180,
      height: 820,
    },
  },
  transparent: false,
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
