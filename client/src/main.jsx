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
import CityRentals from './pages/CityRentals'
import RentalReviews from './pages/RentalReviews'



//Google Maps API 
const mapKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places&callback=initMap`;
script.async = true;
script.defer = true;
document.body.appendChild(script);  


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
      },
      {
        path:"locations/:city/:state",
        element: <CityRentals />
      },
      {
        path: "rentals/:address",
        element: <RentalReviews />
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
