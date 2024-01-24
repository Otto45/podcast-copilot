import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Podcast Co-Pilot',
}

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-4xl font-bold">Podcast Co-Pilot</p>
      <Link href="/copilot">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Launch App
        </button>
      </Link>
    </main>
  )
}
