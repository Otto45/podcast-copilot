"use client"

import { GlobalState } from "@/components/utilities/global-state"
import { Providers } from "@/components/utilities/providers"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ['latin'] })

interface CopilotLayoutProps {
    children: ReactNode
}

export default function CopilotLayout({ children }: CopilotLayoutProps) {
    return (
        <GlobalState>
            {children}
        </GlobalState>
    )
}
