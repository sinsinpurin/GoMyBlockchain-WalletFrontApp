import "../styles/globals.css";

import {StoreProvider} from "../store/reducer"
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
  );
}