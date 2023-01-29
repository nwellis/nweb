import * as React from "react";
import clsx from "clsx";
import TabListTab, { TabListTabProps } from "../common/container/TabListTab";
import { ToolsTabKey } from "./ToolsTabList";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import { Tab } from "@headlessui/react";
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
} & React.HTMLAttributes<HTMLButtonElement>;

function ToolsTab({
  tool,
  active,

  className,
  ...rest
}: ToolsTabProps) {
  return (
    <Tab
      className={clsx(
        className,
        "relative flex flex-col items-center p-3 md:p-4 lg:min-w-[8rem] mx-0.5 md:mx-2",
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
      <h2 className="text-lg sm:text-xl xl:text-2xl font-semibold">
        {ToolsMetadata[tool].name}
      </h2>
      <div
        className={clsx(
          active ? "flex" : "hidden",
          "absolute left-0 top-full w-full flex-row justify-center"
        )}
      >
        <div
          className={clsx("h-4 w-8 bg-gray-darker animate-bounce-slow")}
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 50% 100%)" }}
        />
      </div>
    </Tab>
  );
}

export default ToolsTab;
