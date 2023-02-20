import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    Box,
    Image,
    Grid,
    GridItem,
    Text,
} from '@chakra-ui/react';

export default function BestNine() {
    // const [data, setData] = useState([{}]);
    // // calling the api
    // useEffect(() => {
    //     axios.get("http://0.0.0.0:5000/best-nine?username=leojesuz&year=2022")
    //         .then(res => {
    //             console.log(res.data.best_nine);
    //             setData(res.data.best_nine);
    //         })
    // }, []);
    const data = ['pic0.jpeg',
        'pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg',
        'pic4.jpeg', 'pic5.jpeg', 'pic6.jpeg',
        'pic7.jpeg', 'pic8.jpeg'
    ];

    return (
        <Box >
            <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap={0}>
                {data.map((item) => (
                    <GridItem key={item} w='100%'>
                        <Image src={item} alt={item} />
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}
