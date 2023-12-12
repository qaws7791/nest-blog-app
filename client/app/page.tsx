import Image from 'next/image'
import Link from 'next/link'
import UserInfo from './_components/user-info'

export default function Home() {
  return (
    <main className=' h-screen'>
      <UserInfo />
      <Link href={'/login'}>login</Link>
      <Link href={'write'}>Write</Link>
    </main>
  )
}
