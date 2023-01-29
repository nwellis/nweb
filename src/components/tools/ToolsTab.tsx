import * as React from "react";
import clsx from "clsx";
import { ToolsTabKey } from "./ToolsTabList";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import { Tab } from "@headlessui/react";

export type ToolsTabProps = {
  icon: React.ReactNode;
  tool: ToolsTabKey;
  active?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

function ToolsTab({
  icon,
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
        "bg-gray-darker border border-gray-lighter rounded-2xl",
        "disabled:opacity-60 shadow-md motion-reduce:shadow-none focus:outline-none ring-inset ring-gray-light focus:ring-4",

        active && tool === "react" && "shadow-brand-react",
        active && tool === "android" && "shadow-brand-android",
        active && tool === "pwa" && "shadow-brand-pwa",
        active && tool === "phaser" && "shadow-brand-phaser",

        tool === "react" && "hover:shadow-brand-react",
        tool === "pwa" && "focus:hover:shadow-brand-pwa",
        tool === "android" && "hover:shadow-brand-android",
        tool === "phaser" && "hover:shadow-brand-phaser"
      )}
      {...rest}
    >
      {icon}
      <h2 className="text-lg sm:text-xl xl:text-2xl font-semibold focus:outline">
        {ToolsMetadata[tool].name}
      </h2>
      <div
        className={clsx(
          active ? "flex" : "hidden",
          "absolute left-0 top-[95%] w-full flex-row justify-center"
        )}
      >
        <div
          className={clsx(
            "h-4 w-8 bg-gray-darker animate-bounce-slow"
            // tool === "react" && "border-brand-react",
            // tool === "pwa" && "border-brand-pwa",
            // tool === "android" && "border-brand-android",
            // tool === "phaser" && "border-brand-phaser",
          )}
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 50% 100%)" }}
        />
      </div>
    </Tab>
  );
}

export default ToolsTab;
