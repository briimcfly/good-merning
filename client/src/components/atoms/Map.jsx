import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const Map = ({ address }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        setLocation(results[0].geometry.location);
      } else {
        console.error(`Geocode failed: ${status}`);
      }
    });
  }, [address]);

  useEffect(() => {
    if (location) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers:[{visibility: 'off'}]
            }
        ]

      });
      

      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, [location]);

  return <Box id="map" w="100%" h="100%" />;
};

export default Map;
