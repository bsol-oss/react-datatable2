import React from 'react';
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';

const PageWrapper = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box px={{ base: '4', md: '6' }} pb="5">
      <HStack spacing="3" justify="space-between">
        {!isMobile && (
          <Text color="fg.muted" fontSize="sm">
            Showing 1 to 5 of 42 results
          </Text>
        )}
        <ButtonGroup
          spacing="3"
          justifyContent="space-between"
          width={{ base: 'full', md: 'auto' }}
          variant="secondary"
        >
          <Button>Previous</Button>
          <Button>Next</Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};

export default PageWrapper;
