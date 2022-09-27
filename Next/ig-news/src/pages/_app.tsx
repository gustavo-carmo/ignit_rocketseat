import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { SessionProvider } from "next-auth/react";

import "../styles/global.scss";

interface MyAppProps extends AppProps {
  pageProps: {
    session: any;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
