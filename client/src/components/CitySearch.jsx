import React, { useRef, useEffect } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CitySearch = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    let autocomplete;

    const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            navigate(`/listings/${place.name}`); // Assuming you have a route for listings by city name
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
        <Box textAlign="center" mt="4">
            <Input ref={inputRef} placeholder="Enter a city" />
            <Button
                mt="4"
                colorScheme="blue"
                onClick={handlePlaceSelect}
            >
                Search
            </Button>
        </Box>
    );
};

export default CitySearch;