// Rental Reviews 
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { 
        Box,
        SimpleGrid,
        Heading, 
        Text, 
        Stack,
        Divider, 
        Grid,
        GridItem, 
        Container,
        Image,
        Modal,
        ModalOverlay,
        ModalHeader,
        ModalCloseButton,
        ModalBody,
        ModalContent
    } 
from '@chakra-ui/react';
import Loader from '../components/Loader';
import LabeledStarRating from '../components/molecules/LabeledStarRating';
import Legend from '../components/atoms/Legend';
import StarRating from '../components/Stars';
import PageHeader from '../components/molecules/PageHeader';
import Map from '../components/atoms/Map';
import ImageCarousel from '../components/ImageCarousel';


const displayNames = {
  landLordScore: {
    displayName: "Landlord Score",
    items: {
      attitude: "Attitude",
      leaseManagement: "Lease Management",
      maintenance: "Maintenance",
      responsiveness: "Responsiveness"
    }
  },
  areaScore: {
    displayName: "Area Score",
    items: {
      location: "Location",
      neighborhood: "Neighborhood",
      noiseLevel: "Noise Level",
    }
  },
  financialAspects: {
    displayName: "Financial Aspects",
    items: {
      rentFairness: "Rent Fairness",
      rentIncreases: "Rent Increases",
      value: "Value"
    }
  },
  propertyScore: {
    displayName: "Property Score",
    items: {
      amenities: "Amenities",
      condition: "Condition",
      safety: "Safety"
    }
  },
};


const calcAverages = (reviews) => {
  const scoreSums = {
    landLordScore: {
      attitude: { sum: 0, count: 0 },
      leaseManagement: { sum: 0, count: 0 },
      maintenance: { sum: 0, count: 0 },
      responsiveness: { sum: 0, count: 0 },
    },
    areaScore: {
      location: { sum: 0, count: 0 },
      neighborhood: { sum: 0, count: 0 },
      noiseLevel: { sum: 0, count: 0 },
    },
    financialAspects: {
      rentFairness: { sum: 0, count: 0 },
      rentIncreases: { sum: 0, count: 0 },
      value: { sum: 0, count: 0 },
    },
    propertyScore: {
      amenities: { sum: 0, count: 0 },
      condition: { sum: 0, count: 0 },
      safety: { sum: 0, count: 0 },
    },
  };

  reviews.forEach(review => {
    Object.keys(scoreSums).forEach(category => {
      Object.keys(scoreSums[category]).forEach(item => {
        scoreSums[category][item].sum += review[category][item];
        scoreSums[category][item].count += 1;
      });
    });
  });

  const averages = {};
  Object.keys(scoreSums).forEach(category => {
    let categorySum = 0;
    let itemCount = 0;
    averages[category] = {};
    Object.keys(scoreSums[category]).forEach(item => {
      const { sum, count } = scoreSums[category][item];
      categorySum += sum;
      itemCount += count;
      averages[category][item] = count > 0 ? Math.round((sum / count) * 2) / 2 : 0;
    });
  
    averages[category].overall = itemCount > 0 ? Math.round((categorySum / itemCount) * 2) / 2 : 0;
  });

  return averages;
};



const SummarySection = ({ averages }) => {
  if (!averages) return null;

  return (
    <Box p={10} boxShadow="md" bg="white">
      <Heading as="h2" size="lg">Score Breakdown:</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={24}>
      {Object.keys(averages).map(categoryKey => {
        const categoryName = displayNames[categoryKey].displayName;
        return (
          <Box key={categoryKey} my={2}>
            <Stack direction = "row">
            <Text fontWeight="bold" fontSize="lg">{categoryName}</Text>
            <StarRating rating={averages[categoryKey].overall} />
            </Stack>
            <Divider />
            <SimpleGrid columns={2}>
              {Object.keys(averages[categoryKey])
                .filter(key => key !== 'overall')
                .map(item => {
                  const itemName = displayNames[categoryKey].items[item];
                  return (
                    <>
                    <Box p={4}>
                    <LabeledStarRating key={item} label={itemName} score={averages[categoryKey][item]} />
                    <Legend category={categoryKey} subcategory={item} score={Math.floor(averages[categoryKey][item])} />
                    </Box>
                    </>
                  );
              })}
            </SimpleGrid>
          </Box>
        );
      })}
      </SimpleGrid>
    </Box>
  );
};



const RentalReviews = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    //Handle Image Modal 
    const handleImageClick = (image) => {
      setSelectedImage(image);
      setModalOpen(true);
    }

    const { address } = useParams();
    const decodedAddress = decodeURIComponent(address);

    const { loading, error, data } = useQuery(QUERY_REVIEWS, {
        variables: { address: decodedAddress }
    });

    if (loading) return <Loader />;
    if (error) return <p>Error...</p>;

    let images = data && data.reviews ? data.reviews.flatMap(review=>review.images) : [];
    //have map span all if no images
    let mapItemSpan = images.length === 0 ? 5 : 2 
    const averages = data && data.reviews ? calcAverages(data.reviews) : null;

    return (
      <>
      <Box p ={4} bg="gray.50">
        {/* Header */}
        <PageHeader address={address} titlePrefix='Reviews for '/>

        <Container maxW = 'container.xl'>

        {/* Image Section */}
        <Grid
          h='600px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5,1fr)'
          gap={4}
        >
          {images.length === 0 ? (
            // If there are no images, map takes up the entire space
            <GridItem rowSpan={2} colSpan={5} bg='gray.50'>
              <Map address={address} />
            </GridItem>
          ) : (
            <>
              {/* If there's at least one image...*/}
              <GridItem rowSpan={2} colSpan={3} bgImage={`url(${images[0]})`} bgSize="cover" onClick={() => handleImageClick(images[0])} />
              {/* If there's more than one image...*/}
              {images.length > 1 && (
                <GridItem rowSpan={1} colSpan={2} bgImage={`url(${images[1]})`} bgSize="cover" onClick={() => handleImageClick(images[1])} />
              )}
              {/* If there's only one image, the map takes up the space of the second image */}
              <GridItem rowSpan={images.length > 1 ? 1 : 2} colSpan={2} bg='gray.50'>
                <Map address={address} />
              </GridItem>
            </>
          )}
        </Grid>

        {/* Modal  */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="5xl">
          <ModalOverlay />
          <ModalContent m={6}>
            <ModalHeader>View All Images</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow="hidden">
              <Box width="full" height="full">
                <ImageCarousel images={images} />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Summary Section */}
        <SummarySection averages={averages} />

        {/* Individual Reviews Section */}
        <Box padding="4" >
          <Text fontSize="xl" fontWeight='bold' mb={4}>
            Individual Reviews
          </Text>
          
          <SimpleGrid spacing="8">
            {data.reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </SimpleGrid>

        </Box>
        </Container>
        </Box>
      </>
      );
};

export default RentalReviews;