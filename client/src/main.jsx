import React from 'react'
import ReactDOM from 'react-dom/client'
//imported the createBrowserRouter from react-router-dom to assist with routing
import { createBrowserRouter,  } from 'react-router-dom'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import Login from './pages/Login.jsx'

//the router is created here,
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
         // Default route (index) under the root path this should ne home element, used this for testing
        index: true,
        element: <Login />
      }
    ]
  },
]);

/*change to this: when we get login,home and signup pages and error page
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
