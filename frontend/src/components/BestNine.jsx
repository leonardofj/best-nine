import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    AspectRatio,
    Box,
    Image,
    Grid,
    GridItem,
    Button
} from '@chakra-ui/react';
import { exportComponentAsJPEG } from "react-component-export-image";

export default function BestNine() {
    // const [data, setData] = useState([{}]);
    // // calling the api
    // useEffect(() => {
    //     axios.get("http://0.0.0.0:5000/best-nine?username=leojesuz&year=2022")
    //         .then(res => {
    //             console.log(res.data.best_nine);
    //             setData(res.data.best_nine);
    //         });
    // }, []);
    const data = ['pic0.jpeg',
        'pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg',
        'pic4.jpeg', 'pic5.jpeg', 'pic6.jpeg',
        'pic7.jpeg', 'pic8.jpeg'
    ];
    const printRef = React.useRef();

    return (
        <Box >
            <Button onClick={() => exportComponentAsJPEG(printRef)}>Save</Button>
            <Box ref={printRef}>
                <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap={0}>
                    {data.map((item) => (
                        <GridItem key={item} w='100%'>
                            <AspectRatio ratio={1}>
                                <Image src={item} alt={item} />
                            </AspectRatio>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
