import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { mirageServer } from "../services/mirage";
import { queryClient } from "../services/react-query/queryClient";
import { theme } from "../styles/theme";

if (process.env.NODE_ENV === 'development') {
  mirageServer();
}


function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
