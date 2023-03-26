import * as React from "react";
import clsx from "clsx";

export type ChatBubbleProps = React.HTMLAttributes<HTMLDivElement>;

function ChatBubble({ children, className, ...rest }: ChatBubbleProps) {
  return (
    <div className={clsx(className, "relative bg-gray-darker")} {...rest}>
      {children}
      <div
        className={clsx(
          "absolute left-0 top-[95%] w-full flex flex-row justify-center"
        )}
      >
        <div
          className={clsx("h-4 w-8 bg-gray-darker")}
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 50% 100%)" }}
        />
      </div>
    </div>
  );
}

export default ChatBubble;
