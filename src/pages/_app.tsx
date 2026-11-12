import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Progress</title>
      </Head>
      <div className={`${roboto.variable} flex flex-1 flex-col font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
