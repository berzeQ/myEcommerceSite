import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './navbar/navbar'
import MainBody from './MainBody/MainBody'
import Footer from './Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <main
      className={``}
    >
     {/* <Navbar/> */}
     <MainBody/>
    </main>
  )
}
