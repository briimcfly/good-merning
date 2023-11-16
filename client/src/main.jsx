import React from 'react'
import ReactDOM from 'react-dom/client'
//imported the createBrowserRouter from react-router-dom to assist with routing
import { RouterProvider, createBrowserRouter,  } from 'react-router-dom'
//Chakra
import { ChakraProvider } from '@chakra-ui/react'
//Pages & Components
import App from './App.jsx'
import Landing from './pages/Landing'
import Error from './pages/Error'

//Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
         // Default route (index) under the root path this should ne home element, used this for testing
        index: true,
        element: <Landing />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router = {router} />
    </ChakraProvider>
  </React.StrictMode>
)
