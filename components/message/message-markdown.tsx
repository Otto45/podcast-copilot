import React, { FC } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"

interface MessageMarkdownProps {
  content: string
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ content }) => {
  return (
    <MessageMarkdownMemoized
      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full"
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
