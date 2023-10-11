import { Layout } from "@/components/Layout";
import { NotificationProvider } from "@/store/NotificationContext";
import { PendingProvider } from "@/store/PendingContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PendingProvider>
      <NotificationProvider>
        <Layout>
          <Head>
            <title>Events App</title>
            <meta name="description" content="Find a lot of great events..." />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </PendingProvider>
  );
}
