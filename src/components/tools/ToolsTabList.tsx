import React from "react";
import clsx from "clsx";
import ToolsMetadata from "components/tools/ToolsTabList.metadata.json";
import ToolsTab from "./ToolsTab";
import { Tab, Transition } from "@headlessui/react";

export type ToolsTabKey = keyof typeof ToolsMetadata;
const Tools = Object.keys(ToolsMetadata) as ToolsTabKey[];
type AstroIconSlots = Record<`icon${ToolsTabKey}`, React.ReactSVGElement>;

export type ToolsTabListProps = {} & Partial<AstroIconSlots> &
  React.HTMLAttributes<HTMLDivElement>;

function ToolsTabList({ className, ...rest }: ToolsTabListProps) {
  const [active, setActive] = React.useState<ToolsTabKey>("react");

  return (
    <div className="w-full flex flex-col items-center">
      <Tab.Group onChange={(index) => setActive(Tools[index])}>
        <Tab.List
          as="div"
          className={clsx("flex flex-wrap justify-center", className)}
          {...rest}
        >
          {Tools.map((tool) => (
            <ToolsTab
              icon={rest[`icon${tool}`]}
              key={tool}
              tool={tool}
              active={tool === active}
            />
          ))}
        </Tab.List>
        <Tab.Panels className="mx-2">
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
              <p className="w-full max-w-3xl text-lg md:text-2xl py-4 px-4 md:px-8 text-center h-32">
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
