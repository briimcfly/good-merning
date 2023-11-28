import React, { createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
//imported the createBrowserRouter from react-router-dom to assist with routing
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//Chakra
import { ChakraProvider } from "@chakra-ui/react";
//Pages & Components
import App from './App.jsx'
import Landing from './pages/Landing'
import Error from './pages/Error'
import CityRentals from './pages/CityRentals'
import RentalReviews from './pages/RentalReviews'
import Loader from './components/Loader.jsx'

//Context to manage the state of Google Maps API loading...
export const GoogleMapsAPIContext = createContext(false);

const Main = () => {
  //State to track if Google Maps has loaded... 
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    //A callback function that triggers when Google Maps loads ... 
    window.initMap = () => setGoogleMapsLoaded(true);

    //Create & Append the Google Maps script to index.html
    const mapKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script); 

  }, []);

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

  //If Google Maps hasn't loaded yet.. Display the Loader.. 
  if (!isGoogleMapsLoaded) {
    return <Loader/>;
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ChakraProvider>
        <GoogleMapsAPIContext.Provider value={isGoogleMapsLoaded}>  
          <RouterProvider router = {router} />
        </GoogleMapsAPIContext.Provider>
      </ChakraProvider>
    </React.StrictMode>
  );
  };

//Root element render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Main />);