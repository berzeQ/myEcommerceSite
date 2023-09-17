import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './navbar/navbar';
import Footer from './Footer/Footer'



export default function App({ Component, pageProps }) {
  return( 
    <ChakraProvider>
         <Navbar/>

        <Component {...pageProps} />
     <Footer/>


    </ChakraProvider>
  )
}
