import { inputRef, useEffect } from 'react';
import {useState, formState, setFormState} from 'react';
import {useMutation} from '@apollo/client';
import {LOGIN_USER} from '../utils/mutations';
import Auth from '../utils/auth';
import {
	Input,	Button,	Box,	ButtonGroup,	FormControl,	FormLabel,	Modal,	ModalOverlay,	ModalContent,	ModalHeader,	ModalBody,	ModalCloseButton,	Stack,	useDisclosure,	Alert,	AlertIcon,	AlertTitle,	AlertDescription,	Accordion,	AccordionItem,	AccordionButton,	AccordionPanel,	AccordionIcon,	Radio,	RadioGroup, Text, IconButton,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
// import CityRentals from '../pages/CityRentals';
//import { ADD_LOCATION_REVIEW } from '../utils/mutations';
// import Login from './Login';
// import Signup from './Signup';
import Legend  from './atoms/Legend';
import { ratingDescription } from '../utils/ratingDescriptions';
import CitySearch from './CitySearch';
//import { uploadImageToStorage } from '../../../server/utils/googleCloudStorage';



const NewLocationReview = ({isOpen,onClose}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [formState, setFormState] = useState({
        location: "",
        review: "",
        rating: "",
        image: null,
    });
       
    const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
            // Extract city and state from the address components
            const cityComponent = place.address_components.find(component => component.types.includes('locality'));
            const stateComponent = place.address_components.find(component => component.types.includes('administrative_area_level_1'));
            const city = cityComponent ? cityComponent.long_name : '';
            const state = stateComponent ? stateComponent.short_name : '';

            if (city && state) {
                navigate(`/listings/${city}/${state}`);
            }
        } else {
            alert("No details available for input: '" + place.name + "'");
        }
    };

  //   app.post("/multiple", upload.array("images", 5), (req, res) => {
		// 	if (req.files) {
		// 		res.send("Multiple files uploaded successfully");
		// 	} else {
		// 		res.status(400).send("Please upload valid images");
		// 	}
		// });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

        const handleFileChange = (e) => { 
					const { name, files } = e.target;
					setFormState({
						...formState,
						[name]: files,
					});
				};
    
     const handleCheck = (event) => {
      const value = event.target.value;
      setSelectedRadio(value);
      Legend.score = value;
      console.log(value);
     };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         console.log(formState);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            location: "",
            review: "",
            rating: "",
            image: null,
        });

        setSelectedRadio(null);
    };

    const handleCancel = () => {
        onClose();
      };

    //const sizes = ["xs", "sm", "md", "lg", "xl", "full"];

    return (
			<>
				{/* {sizes.map((size) => (
        <Button
          onClick={() => handleSizeClick(size)}
          key={size}
          m={4}
        >{`Open ${size} Modal`}</Button>
      ))} */}
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader textAlign="left" borderBottomWidth="1px">
							<Box fontSize="lg">Address</Box>
							<CitySearch />
						</ModalHeader>

						<ModalBody>
							<FormControl>
								<FormLabel fontSize="lg">Rating</FormLabel>
								<Accordion allowToggle>
									<AccordionItem>
										<h2>
											<AccordionButton>
												<Box as="span" flex="1" textAlign="left">
													<Text as="b">Landlord Rating</Text>
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Legend
												category="landlordScore"
												subcategory="responsiveness"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Responsiveness
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Rarely or never responds to messages and requests.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Responds but often takes several days or follow-ups.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Responds within a reasonable time, but not always
													promptly.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Usually responds promptly within a day.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Always responds very quickly, often within hours.
												</Radio>
											</RadioGroup>
											<Legend
												category="landlordScore"
												subcategory="attitude"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Attitude
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Rude, unprofessional, and difficult to deal with.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Often curt or unprofessional in interactions.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Generally professional but may occasionally be
													difficult.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Consistently polite and professional in all dealings.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Exceedingly courteous, professional, and a pleasere to
													communicate with.
												</Radio>
											</RadioGroup>
											<Legend
												category="landlordScore"
												subcategory="maintenance"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Maintenance
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Ignores maintenance requests; property is in
													disrepair.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Slow to address maintenance issues, with repeated
													reminders needed.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Addresses maintenance issues, but sometimes not
													thoroughly.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Prompt and thorough with most maintenance issues.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Exceptionally proactive and efficient in maintaining
													the property.
												</Radio>
											</RadioGroup>
											<Legend
												category="landlordScore"
												subcategory="leaseManagement"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Lease Management
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Lease terms are unclear or unfair, and issues are
													handled poorly.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Lease terms are somewhat clear but not always enforced
													fairly.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Fair lease terms and average handling of lease-related
													matters.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Clear lease terms, with transparent and fair handling
													of all issues.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Exemplary lease management with tenant's best
													interests in mind.
												</Radio>
											</RadioGroup>
										</AccordionPanel>
									</AccordionItem>

									<AccordionItem>
										<h2>
											<AccordionButton>
												<Box as="span" flex="1" textAlign="left">
													<Text as="b">Property Rating</Text>
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Legend
												category="propertyScore"
												subcategory="condition"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Condition
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Property is in poor condition, with many issues
													needing attention.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Property has some deferred maintenance or wear and
													tear.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Property is in good condition with some minor issues.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Property is well-maintained with very few issues.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Property is in excellent condition, like new.
												</Radio>
											</RadioGroup>
											<Legend
												category="propertyScore"
												subcategory="amenities"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Amenities
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Lacks basic amenities, nothing extra provided.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Has a few amenities, but they are not well-maintained.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													A decent range of amenities, generally in working
													order.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Good selection of well-maintained amenities.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Excellent range of high-quality amenities available
													and well-maintained.
												</Radio>
											</RadioGroup>
											<Legend
												category="propertyScore"
												subcategory="safety"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Safety
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Property feels unsafe; no security measures in place.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Minimal security measures that are not always
													reliable.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Average safety; some security features in place.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Secure property with reliable safety measures.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Very secure with advanced safety measures and an
													excellent safety record.
												</Radio>
											</RadioGroup>
										</AccordionPanel>
									</AccordionItem>

									<AccordionItem>
										<h2>
											<AccordionButton>
												<Box as="span" flex="1" textAlign="left">
													<Text as="b">Area Rating</Text>
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Legend
												category="areaScore"
												subcategory="location"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Location
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Inconvenient location with few services or
													transportation options.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Somewhat inconvenient; services and transport are a
													bit far.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Average location; services and transport are
													accessible.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Good location with many services and transport
													options.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Excellent location, extremely convenient for all
													services and transportation.
												</Radio>
											</RadioGroup>
											<Legend
												category="areaScore"
												subcategory="noise"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Noise Level
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Very noisy almost all the time, with constant
													disturbances.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Often noisy, with frequent disturbances.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Some noise from time to time, but tolerable.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Generally quiet with rare disturbances.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Very quiet, almost no noise pollution.
												</Radio>
											</RadioGroup>
											<Legend
												category="areaScore"
												subcategory="neighborhood"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Neighborhood
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Lacks amenities like parks, restaurants, and shops.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Few amenities, and they are not well-maintained or
													desirable.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													A decent amount of average-quality neighborhood
													amenities.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Many good-quality amenities that enhance living
													experience.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													A wide variety of excellent amenities that greatly
													enhance living experience.
												</Radio>
											</RadioGroup>
										</AccordionPanel>
									</AccordionItem>
									<AccordionItem>
										<h2>
											<AccordionButton>
												<Box as="span" flex="1" textAlign="left">
													<Text as="b">Financial Rating</Text>
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											<Legend
												category="financialScore"
												subcategory="rentFairness"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Rent Fairness
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Rent is significantly higher than comparable
													properties in the area.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Rent is somewhat higher than average for the area and
													property condition.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Rent is average for the area and property condition.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Rent is a good value considering the area and property
													condition.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Rent is an excellent value, below average for the area
													and property condition.
												</Radio>
											</RadioGroup>
											<Legend
												category="financialScore"
												subcategory="rentIncrease"
												score=""
											/>
											<Text color="green" as="em" fontSize="md">
												Rent Increase
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Frequent and significant rent increases with little to
													no justification.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Above-average rent increases, sometimes with short
													notice.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Average rent increases in line with market rates.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Infrequent and modest rent increases, with fair
													notice.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Very rare rent increases, always with ample notice and
													clear justification.
												</Radio>
											</RadioGroup>
											<Text color="green" as="em" fontSize="md">
												Value
											</Text>
											<RadioGroup colorScheme="green" onChange={handleCheck}>
												<Legend
													category="financialScore"
													subcategory="value"
													score=""
												/>
												<Radio
													value="1"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "1"
													}
												>
													Poor value; high rent with many issues and few
													amenities.
												</Radio>
												<Radio
													value="2"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "2"
													}
												>
													Below-average value; rent is somewhat high compared to
													what is offered.
												</Radio>
												<Radio
													value="3"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "3"
													}
												>
													Average value for money; rent corresponds to the
													market and property features.
												</Radio>
												<Radio
													value="4"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "4"
													}
												>
													Good value for money; reasonable rent for the quality
													and features of the property.
												</Radio>
												<Radio
													value="5"
													isDisabled={
														selectedRadio !== null && selectedRadio !== "5"
													}
												>
													Excellent value for the money; rent is very reasonable
													for the high quality and features of the property.
												</Radio>
											</RadioGroup>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</FormControl>
						</ModalBody>

						<form onSubmit={handleSubmit}>
							<Stack spacing={4}>
								<Box>
									<FormControl>
										<FormLabel fontSize="lg">Review</FormLabel>
										<Input
											name="review"
											onChange={handleChange}
											placeholder="Enter your comments here..."
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl>
										<FormLabel fontSize="lg">Add Pictures</FormLabel>
										<Input
											name="image"
											type="file"
											multiple
											onChange={handleFileChange}
										/>
									</FormControl>
								</Box>

								<ButtonGroup variant="outline" spacing="6">
									<Button
										colorScheme="blue"
										variant="solid"
										w="100%"
										type="submit"
									>
										Submit
									</Button>

									<Button
										onClick={handleCancel}
										variant="solid"
										colorScheme="gray"
										w="100%"
										borderColor="gray"
										borderWidth="1px"
									>
										Cancel
									</Button>
								</ButtonGroup>
							</Stack>
						</form>
					</ModalContent>
				</Modal>
			</>
		);
}   

export default NewLocationReview;