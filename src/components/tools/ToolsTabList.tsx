import * as React from "react";
import clsx from "clsx";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import ToolsTab from "./ToolsTab";
import { Tab, Transition } from "@headlessui/react";

export type ToolsTabKey = keyof typeof ToolsMetadata;
const Tools = Object.keys(ToolsMetadata) as ToolsTabKey[];

export type ToolsTabListProps = {} & React.HTMLAttributes<HTMLDivElement>;

function ToolsTabList({ className, ...rest }: ToolsTabListProps) {
  const [active, setActive] = React.useState<ToolsTabKey>("react");
  console.log(`ACTIVE:${active}`);

  return (
    <div className="w-full flex flex-col items-center">
      <Tab.Group onChange={(index) => setActive(Tools[index])}>
        <Tab.List
          as="div"
          className={clsx("flex flex-wrap", className)}
          {...rest}
        >
          {Tools.map((tool) => (
            <ToolsTab key={tool} tool={tool} active={tool === active} />
          ))}
        </Tab.List>
        <Tab.Panels>
          {Tools.map((tool) => (
            <Transition
              key={tool}
              unmount={false}
              as={Tab.Panel}
              show={tool === active}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <p className="w-full max-w-3xl m-8 text-2xl px-4">
                {ToolsMetadata[tool].description}
              </p>
            </Transition>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default ToolsTabList;
