import { inputRef, useEffect } from "react";
import { useState, formState, setFormState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Input, Button, Box, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import CityRentals from '../pages/CityRentals';
//import { ADD_LOCATION_REVIEW } from '../utils/mutations';
import {
	FormControl,
	FormLabel,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Stack,
} from "@chakra-ui/react";
// import Login from './Login';
// import Signup from './Signup';
import { useDisclosure } from "@chakra-ui/react";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import Legend from "./atoms/Legend";
import { ratingDescription } from "../utils/ratingDescriptions";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

const NewLocationReview = ({ isOpen, onClose }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [selectedCheckbox, setSelectedCheckbox] = useState(null);
	const [formState, setFormState] = useState({
		location: "",
		review: "",
		rating: "",
	});

	const handlePlaceSelect = () => {
		const place = autocomplete.getPlace();
		if (place.address_components) {
			// Extract city and state from the address components
			const cityComponent = place.address_components.find((component) =>
				component.types.includes("locality")
			);
			const stateComponent = place.address_components.find((component) =>
				component.types.includes("administrative_area_level_1")
			);
			const city = cityComponent ? cityComponent.long_name : "";
			const state = stateComponent ? stateComponent.short_name : "";

			if (city && state) {
				navigate(`/listings/${city}/${state}`);
			}
		} else {
			alert("No details available for input: '" + place.name + "'");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleCheck = () => {
		setSelectedCheckbox(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			// Display the warning alert
			return;
		}
		try {
			const { data } = await loginUser({
				variables: { ...formState },
			});
			Auth.login(data.loginUser.token);
			setIsLoggedIn(true);
		} catch (e) {
			console.error(e);
		}

		setFormState({
			location: "",
			review: "",
			rating: "",
		});
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="left" borderBottomWidth="1px">
					<Box fontSize="lg">Address</Box>
					<ModalCloseButton
						onClick={onClose}
						variant="unstyled"
						fontSize="lg"
						position="absolute"
						right="1rem"
						top="0.5rem"
					>
						X
					</ModalCloseButton>
				</ModalHeader>
				<Box textAlign="center" mt="4">
					<Input ref={inputRef} placeholder="Enter address" />
					<Button mt="4" colorScheme="blue" onClick={handlePlaceSelect}>
						Search
					</Button>
				</Box>
				<ModalBody>
					<FormControl>
						<FormLabel>Rating</FormLabel>
						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											Landlord Rating
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Responsiveness
									<CheckboxGroup colorScheme="green" onChange={handleCheck}>
										<Checkbox
											value="1"
											isDisabled={
												selectedCheckbox !== null && selectedCheckbox !== "1"
											}
										>
											Rarely or never responds to messages and requests.
										</Checkbox>
										<Checkbox
											value="2"
											isDisabled={
												selectedCheckbox !== null && selectedCheckbox !== "2"
											}
										>
											Responds but often takes several days or follow-ups.
										</Checkbox>
										<Checkbox
											value="3"
											isDisabled={
												selectedCheckbox !== null && selectedCheckbox !== "3"
											}
										>
											Responds within a reasonable time, but not always
											promptly.
										</Checkbox>
										<Checkbox
											value="4"
											isDisabled={
												selectedCheckbox !== null && selectedCheckbox !== "4"
											}
										>
											Usually responds promptly within a day.
										</Checkbox>
										<Checkbox
											value="5"
											isDisabled={
												selectedCheckbox !== null && selectedCheckbox !== "5"
											}
										>
											Consistently responds very quickly, often within hours.
										</Checkbox>
									</CheckboxGroup>
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											Property Rating
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
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											Area Rating
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											Financial Rating
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</FormControl>
				</ModalBody>

				<form onSubmit={handleSubmit}>
					<Stack spacing={4}>
						<FormControl>
							<FormLabel>Review</FormLabel>
							<Input
								name="review"
								onChange={handleChange}
								placeholder="Enter your comments here..."
							/>
						</FormControl>
						<ButtonGroup variant="outline" spacing="6">
							<Button colorScheme="blue" variant="solid" w="100%" type="submit">
								Submit
							</Button>
							{!setIsLoggedIn && (
								<>
									<Alert status="warning">
										<AlertIcon />
										You must be logged in to submit a review.
									</Alert>
								</>
							)}

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
	);
};

export default NewLocationReview;