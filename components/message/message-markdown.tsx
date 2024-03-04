import React, { FC } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"
import { cn } from "@/utils/utils"

interface MessageMarkdownProps {
  content: string,
  copilotChatRole?: 'user' | 'copilot'
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ content, copilotChatRole }) => {
  return (
    <MessageMarkdownMemoized
      className={cn("prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full", copilotChatRole && copilotChatRole === 'user' ? "text-right" : "")}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        }
      }}
    >
      {content}
    </MessageMarkdownMemoized>
  )
}
