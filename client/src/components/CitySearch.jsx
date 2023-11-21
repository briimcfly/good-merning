import React, { useRef, useEffect } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
            { types: ['(cities)'] }
        );
        autocomplete.addListener('place_changed', handlePlaceSelect);
    }, []);

    return (
        <Box textAlign="center" display="flex" gap="10px" >
            <Input ref={inputRef} placeholder="Enter a city" marginLeft="10px"/>
            <Button
                colorScheme="gray"
                onClick={handlePlaceSelect}
            >
                Search
            </Button>
        </Box>
    );
};

export default CitySearch;