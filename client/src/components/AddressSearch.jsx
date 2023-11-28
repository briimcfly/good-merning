import React, { useRef, useEffect } from 'react';
import { Input, Box } from '@chakra-ui/react';

const AddressSearch = ({ city, state, onAddressSelect }) => {
    const inputRef = useRef(null);
    let autocomplete;

    useEffect(() => {
        autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ['address'] }
        );
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.address_components) {
                onAddressSelect(place.address_components);
            }
        });
    }, [onAddressSelect]);

    return (
        <Box textAlign="center" justifyContent="space-between" display="flex" gap={2}>
            {/* Hard Set z-index of google dropdown field */}
                <style>
                    {`.pac-container { z-index: 9999 !important; }`}
                 </style>
            <Input ref={inputRef} placeholder={`Select an address in ${city}, ${state}`} />
        </Box>
    );
};

export default AddressSearch;
