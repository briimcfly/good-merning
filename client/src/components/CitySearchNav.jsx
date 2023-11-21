import React, { useRef, useEffect } from 'react';
import { Input, Button, Box, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CitySearchNav = () => {
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
        <SimpleGrid columns={2} spacing={10}>
        <Box textAlign="left">
            <Input ref={inputRef} placeholder="Enter a city" />
        </Box>
        <Box textAlign="right">
            <Button colorScheme="blue" onClick={handlePlaceSelect}>
                Search
            </Button>
        </Box>
        </SimpleGrid>
    );
};

export default CitySearchNav;