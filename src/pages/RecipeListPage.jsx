import { useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../utils/data';
import { Box, Center, Container, Image, Input, SimpleGrid, Text, Tag, HStack, Button, Flex } from '@chakra-ui/react';

export const RecipeListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  const filteredRecipes = data.hits.filter((hit) => {
    const searchTermNoDash = searchTerm.toLowerCase().replace('-', ' ');
    const matchesLabel = hit.recipe.label.toLowerCase().includes(searchTermNoDash);
    const matchesHealthLabels = hit.recipe.healthLabels.some(label => 
      label.toLowerCase().includes(searchTermNoDash)
    );
    const matchesDietLabels = hit.recipe.dietLabels.some(label => 
      label.toLowerCase().includes(searchTermNoDash)
    );
    const matchesDietFilter = !selectedDiet || hit.recipe.healthLabels.includes(selectedDiet);

    return (searchTerm === '' || matchesLabel || matchesHealthLabels || matchesDietLabels) && matchesDietFilter;
  });

  return (
    <Box bg="#4299E1" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Center mb={8} flexDir="column">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            size="lg"
            maxW="md"
            bg="white"
            borderRadius="md"
            mb={4}
          />
          <HStack spacing={4}>
            <Button
              colorScheme={selectedDiet === 'Vegetarian' ? 'green' : 'gray'}
              onClick={() => setSelectedDiet(selectedDiet === 'Vegetarian' ? '' : 'Vegetarian')}
            >
              Vegetarian
            </Button>
            <Button
              colorScheme={selectedDiet === 'Vegan' ? 'green' : 'gray'}
              onClick={() => setSelectedDiet(selectedDiet === 'Vegan' ? '' : 'Vegan')}
            >
              Vegan
            </Button>
            <Button
              colorScheme={selectedDiet === 'Pescatarian' ? 'green' : 'gray'}
              onClick={() => setSelectedDiet(selectedDiet === 'Pescatarian' ? '' : 'Pescatarian')}
            >
              Pescatarian
            </Button>
          </HStack>
        </Center>

        {filteredRecipes.length === 0 ? (
          <Box 
            bg="white" 
            p={8} 
            borderRadius="xl" 
            textAlign="center"
          >
            <Text fontSize="xl">No recipes found. Please try a different search term.</Text>
          </Box>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {filteredRecipes.map((hit) => (
            <Link key={hit.recipe.label} to={`/recipe/${hit.recipe.label}`}>
              <Box 
                bg="white" 
                borderRadius="xl" 
                overflow="hidden" 
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
                height="450px"
                display="flex"
                flexDirection="column"
              >
                <Image 
                  src={hit.recipe.image} 
                  alt={hit.recipe.label} 
                  height="200px"
                  objectFit="cover"
                />
                <Box p={4} flex="1" display="flex" flexDirection="column">
                  <Text fontSize="xl" fontWeight="semibold" mb={2} noOfLines={2}>
                    {hit.recipe.label}
                  </Text>
                  <Box flex="1">
                    <HStack mb={2}>
                      <Text fontWeight="bold">Meal Type:</Text>
                      <Text noOfLines={1}>{hit.recipe.mealType?.[0] || 'Not specified'}</Text>
                    </HStack>
                    <HStack mb={2}>
                      <Text fontWeight="bold">Dish Type:</Text>
                      <Text noOfLines={1}>{hit.recipe.dishType?.[0] || 'Not specified'}</Text>
                    </HStack>
                  </Box>
                  <Box>
                    {hit.recipe.dietLabels.length > 0 && (
                      <Flex gap={2} flexWrap="wrap" mb={2}>
                        {hit.recipe.dietLabels.map(label => (
                          <Tag key={label} colorScheme="green" size="sm">{label}</Tag>
                        ))}
                      </Flex>
                    )}
                    {hit.recipe.cautions.length > 0 && (
                      <Flex gap={2} flexWrap="wrap">
                        {hit.recipe.cautions.map(caution => (
                          <Tag key={caution} colorScheme="red" size="sm">{caution}</Tag>
                        ))}
                      </Flex>
                    )}
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};