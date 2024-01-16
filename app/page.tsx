"use client" // TODO: Remove this line when we create the landing page

import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 
// TODO: Comment this in when we create the landing page
// export const metadata: Metadata = {
//   title: 'Podcast Co-Pilot',
// }

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/copilot')
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-4xl font-bold">Podcast Co-Pilot</p>
    </main>
  )
}
