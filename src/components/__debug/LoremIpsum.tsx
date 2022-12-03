import * as React from "react";
import clsx from "clsx";
import { range } from "../../utils/Number";

const LoremIpsumParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non lacus rhoncus, semper neque quis, scelerisque quam. Integer sed odio quis lacus ornare consectetur ac at diam. Donec ultricies, est eget tincidunt fermentum, lectus dui vestibulum dolor, sed malesuada sem elit eu purus. Cras auctor purus neque, imperdiet blandit risus eleifend a. Vestibulum nec felis luctus libero efficitur lacinia. Aenean efficitur, leo id placerat consectetur, risus metus accumsan tellus, quis posuere nisi metus quis risus. Etiam malesuada neque vitae turpis euismod molestie. Pellentesque placerat, enim vel tincidunt convallis, leo diam blandit felis, ut fringilla tellus erat nec eros. Nam commodo volutpat turpis ac aliquet. In hac habitasse platea dictumst.";

export type LoremIpsumProps = {
  times?: number;
};

function LoremIpsum({ times = 1 }: LoremIpsumProps) {
  return (
    <React.Fragment>
      {range(times).map((i) => (
        <p key={`lorem-${i}`}>{LoremIpsumParagraph}</p>
      ))}
    </React.Fragment>
  );
}

export default LoremIpsum;
