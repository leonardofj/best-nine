import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import BestNine from './components/BestNine';
import Header from './components/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Header />
          <BestNine />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
