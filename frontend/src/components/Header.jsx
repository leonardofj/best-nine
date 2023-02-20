import React from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Code,
    Grid,
    theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function Header() {
    return (
        <Box textAlign="center" fontSize="xl">
            <ColorModeSwitcher justifySelf="flex-end" />
            <Text>
                Insta Best Nine
            </Text>
        </Box>
    );
}

export default Header;
