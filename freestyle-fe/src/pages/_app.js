import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./navbar/navbar";
import Footer from "./Footer/Footer";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store/index";
import { PersistGate } from "redux-persist/integration/react";
import styles from "../styles/mainStyles.module.css";

export default function App({ Component, pageProps }) {
  return (
    <div className={styles.bodyCss}>
      <ChakraProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* {getLayout(<Component {...pageProps} />, pageProps)} */}
            <Navbar />

            <Component {...pageProps} />
            <Footer />
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </div>
  );
}
