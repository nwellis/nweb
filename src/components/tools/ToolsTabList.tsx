import * as React from "react";
import clsx from "clsx";
import TabList, { TabListProps } from "components/common/container/TabList";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import ToolsTab from "./ToolsTab";

export type ToolsTabKey = keyof typeof ToolsMetadata;
const Tools = Object.keys(ToolsMetadata) as ToolsTabKey[];
const Default: ToolsTabKey = "react";

export type ToolsTabListProps = {} & Omit<TabListProps, "tabs" | "children">;

function ToolsTabList({ ...rest }: ToolsTabListProps) {
  const [active, setActive] = React.useState<ToolsTabKey>(Default);

  return (
    <TabList
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
        <p key={tool}>{ToolsMetadata[tool].description}</p>
      ))}
    </TabList>
  );
}

export default ToolsTabList;
