import * as React from "react";
import clsx from "clsx";
import TabList, { TabListProps } from "components/common/container/TabList";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import ToolsTab from "./ToolsTab";
import LoremIpsum from "components/__debug/LoremIpsum";

export type ToolsTabKey = keyof typeof ToolsMetadata;
const Tools = Object.keys(ToolsMetadata) as ToolsTabKey[];

export type ToolsTabListProps = {} & Omit<TabListProps, "tabs" | "children">;

function ToolsTabList({ className, ...rest }: ToolsTabListProps) {
  const [active, setActive] = React.useState<ToolsTabKey>("react");

  return (
    <TabList
      className={clsx(className, "items-center")}
      tabIndex={Tools.indexOf(active)}
      tabs={Tools.map((tool) => (
        <ToolsTab
          key={tool}
          tool={tool}
          active={tool === active}
          onClick={() => setActive(tool)}
        />
      ))}
      {...rest}
    >
      {Tools.map((tool) => (
        <p
          key={tool}
          className={clsx(
            "transition-opacity motion-reduce:transition-none duration-1000",
            tool === active ? "flex opacity-100" : "hidden opacity-0",
            "w-full max-w-3xl m-8 text-xl px-4"
          )}
        >
          {ToolsMetadata[tool].description || <LoremIpsum />}
        </p>
      ))}
    </TabList>
  );
}

export default ToolsTabList;
