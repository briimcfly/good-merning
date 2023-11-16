import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Outlet } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client = {client}>
          <Outlet />
      </ApolloProvider>
    </ChakraProvider>

  )
}

export default App
