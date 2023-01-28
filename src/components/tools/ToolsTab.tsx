import * as React from "react";
import clsx from "clsx";
import TabListTab, { TabListTabProps } from "../common/container/TabListTab";
import { ToolsTabKey } from "./ToolsTabList";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
// import { Icon } from "astro-icon";

// const Graphic: Record<ToolsTabKey, React.ReactNode> = {
//   react: <Icon class="w-12 h-12 p-px" name="mdi:github" />,
//   android: <Icon class="w-12 h-12 p-px" name="mdi:github" />,
//   pwa: <Icon class="w-12 h-12 p-px" name="mdi:github" />,
//   phaser: <Icon class="w-12 h-12 p-px" name="mdi:github" />,
// };

export type ToolsTabProps = {
  tool: ToolsTabKey;
  active?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function ToolsTab({
  tool,
  active,

  className,
  ...rest
}: ToolsTabProps) {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center p-4 min-w-[8rem] mx-2",
        "bg-gray-darker border border-gray-lighter rounded-lg",
        "disabled:opacity-60 shadow-md motion-reduce:shadow-none",

        active && tool === "react" && "shadow-brand-react",
        active && tool === "android" && "shadow-brand-android",
        active && tool === "pwa" && "shadow-brand-pwa",
        active && tool === "phaser" && "shadow-brand-phaser",

        tool === "react" && "hover:shadow-brand-react",
        tool === "pwa" && "hover:shadow-brand-pwa",
        tool === "android" && "hover:shadow-brand-android",
        tool === "phaser" && "hover:shadow-brand-phaser"
      )}
      {...rest}
    >
      <h2 className="text-2xl font-semibold">{ToolsMetadata[tool].name}</h2>
    </div>
  );
}

export default ToolsTab;
