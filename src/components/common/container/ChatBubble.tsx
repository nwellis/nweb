import * as React from "react";
import clsx from "clsx";

export type ChatBubbleProps = {
} & React.HTMLAttributes<HTMLDivElement>;

function ChatBubble({ className, ...rest }: ChatBubbleProps) {
  return (
    <div className={clsx(className, "flex flex-col")} {...rest}>
      ChatBubble
    </div>
  )
}

export default ChatBubble;
