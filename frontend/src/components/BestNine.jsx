import React, { useState } from 'react';
import axios from "axios";
import {
    AspectRatio,
    Box,
    Image,
    Grid,
    GridItem,
    Button,
    FormControl,
    Input,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { exportComponentAsJPEG } from "react-component-export-image";

export default function BestNine() {
    const [username, setUsername] = useState('');
    const [year, setYear] = useState(2022);
    const [data, setData] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // calling the api
        axios.get("http://0.0.0.0:5000/best-nine", {
            params: {
                username: username,
                year: parseInt(year)
            }
        })
            .then(res => {
                console.log(res.data.best_nine);
                setData(res.data.best_nine);
            });
    };
    const printRef = React.useRef();

    return (
        <Box >
            <Box>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Year</FormLabel>
                        <NumberInput name="year" value={year} max={2023} min={2015} onChange={(value) => setYear(value)}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <br />
                    <Button type='submit' colorScheme='blue'>Send</Button>
                </form>
            </Box>
            {!data ? "" :
                <Box width="100%">
                    <Button onClick={() => exportComponentAsJPEG(printRef)}>Save</Button>
                    <Box ref={printRef}>
                        <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap={0}>
                            {data.map((item) => (
                                <GridItem key={item.picture} w='100%'>
                                    <AspectRatio ratio={1}>
                                        <Image src={item.picture} alt={item.picture} />
                                    </AspectRatio>
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </Box>}
        </Box>
    );
}
