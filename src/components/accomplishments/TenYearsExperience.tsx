import * as React from "react";
import clsx from "clsx";

export type TenYearsExperienceProps = {
} & React.HTMLAttributes<HTMLDivElement>;

function TenYearsExperience({ className, ...rest }: TenYearsExperienceProps) {
  return (
    <div className={clsx(className, "flex flex-col")} {...rest}>
      TenYearsExperience
    </div>
  )
}

export default TenYearsExperience;
