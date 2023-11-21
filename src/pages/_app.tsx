import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import Head from 'next/head'
import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>dash.up</title>
      </Head>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </>
  )
}
