import * as React from "react";
import clsx from "clsx";
import TabList, { TabListProps } from "components/common/container/TabList";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import ToolsTab from "./ToolsTab";
import LoremIpsum from "components/__debug/LoremIpsum";
import { Transition } from "@headlessui/react";

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
        <Transition
          key={tool}
          as="p"
          show={tool === active}
          className="w-full max-w-3xl m-8 text-2xl px-4"
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          {ToolsMetadata[tool].description || <LoremIpsum />}
        </Transition>
      ))}
    </TabList>
  );
}

export default ToolsTabList;
