import React, { useRef, useEffect } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";


const CitySearch = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    let autocomplete;

    const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
            // Extract city and state from the address components
            const cityComponent = place.address_components.find(component => component.types.includes('locality'));
            const stateComponent = place.address_components.find(component => component.types.includes('administrative_area_level_1'));
            const city = cityComponent ? cityComponent.long_name : '';
            const state = stateComponent ? stateComponent.short_name : '';

            if (city && state) {
                navigate(`/locations/${city}/${state}`);
            }
        } else {
            alert("No details available for input: '" + place.name + "'");
        }
    };

  useEffect(() => {
		autocomplete = new window.google.maps.places.Autocomplete(
			inputRef.current,
			{ types: ["(cities)"] }
		);
		autocomplete.addListener("place_changed", handlePlaceSelect);
	}, []);

    return (
			<Box
				textAlign="center"
				mt="4"
				justifyContent="space-between"
				display="flex"
			>
				<Input ref={inputRef} placeholder="Enter a city" />
				<Autocomplete
					apiKey="AIzaSyC0YDeEjH5putpeGTAh8sxwAvqF56vfyVI"
					onPlaceSelected={handlePlaceSelect}
					options={{
						types: ["(cities)"],
					}}
				/>
				<Button colorScheme="blue" onClick={handlePlaceSelect}>
					Go
				</Button>
			</Box>
		);
};



export default CitySearch;