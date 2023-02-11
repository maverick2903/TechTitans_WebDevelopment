import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ClientListingCard({ clientData }) {
    const [userName, setUserName] = useState("");

    return (
        <Card>
            <CardHeader>
                <Heading size="md">{clientData.field}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{clientData.description}</Text>
            </CardBody>
            <CardFooter>
                <Button onClick={() => setUserName(clientData.username)}>
                    Chat with client
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function ListingPage() {
    const [clientListing, setClientListing] = useState([
        {
            field: "Electrician",
            description: "Need to fix 2 tubelights",
            username: "mohit",
        },
        {
            field: "Electrician",
            description: "Need to fix 2 tubelights",
            username: "rohit",
        },
        {
            field: "Electrician",
            description: "Need to fix 2 tubelights",
            username: "varun",
        },
        {
            field: "Electrician",
            description: "Need to fix 2 tubelights",
            username: "karun",
        },
        {
            field: "Electrician",
            description: "Need to fix 2 tubelights",
            username: "varun",
        },
        {
            field: "Electrician",
            description: "Need to fix 2 tubelights",
            username: "karun",
        },
    ]);

    useEffect(() => {
        (async () => {
            const jsonwebtoken = localStorage.getItem("jsonwebtoken");

            const resp = await fetch("http://localhost:5000/worker/clientJob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jsonwebtoken,
                }),
            });

            const data = await resp.json();
            console.log(data);
            if (resp.status === 200) {
                // setClientListing(data);
                //Can replace with a toast or popup
            } else {
                //Can replace with a toast or popup
            }
        })();
    }, []);

    return (
        <SimpleGrid
            marginTop="3rem"
            marginLeft="3rem"
            marginRight="3rem"
            spacing={8}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
            {clientListing.map((clientData) => (
                <ClientListingCard
                    clientData={clientData}
                    key={clientData.username}
                />
            ))}
        </SimpleGrid>
    );
}
