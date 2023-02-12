import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
    Stack,
    Input,
    FormLabel,
    FormControl,
    Box,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

function ClientListingCard({ clientData }) {
    const [userName, setUserName] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [priceByWorker, setPriceByWorker] = useState();
    const initialRef = useRef(null);
    return (
        <>
            <Card>
                <CardHeader>
                    <Heading size="md">{clientData.field}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{clientData.description}</Text>
                </CardBody>
                <CardFooter>
                    <Button onClick={onOpen}>Chat with worker</Button>
                </CardFooter>
            </Card>
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Negotiation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Here we need to add asection for all prices */}
                        <Box
                            borderWidth="1px"
                            border="2px solid"
                            rounded="lg"
                            p="6"
                            m="auto"
                            textAlign="center"
                        >
                            hi there
                        </Box>
                        <form method="POST">
                            <FormControl>
                                <FormLabel htmlFor="username">
                                    Quote a price
                                </FormLabel>
                                <Input
                                    id="price"
                                    ref={initialRef}
                                    type="number"
                                    value={priceByWorker}
                                    onChange={(e) =>
                                        setPriceByWorker(e.target.value)
                                    }
                                />
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Stack spacing={4} m="auto">
                            <Button
                                leftIcon={<CheckIcon />}
                                colorScheme="green"
                                variant="solid"
                            >
                                Accept
                            </Button>
                            <Button
                                leftIcon={<CloseIcon />}
                                colorScheme="red"
                                variant="solid"
                            >
                                Reject
                            </Button>
                        </Stack>

                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Confirm new price</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
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
            field: "Plumber",
            description: "Sink in the bathroom needs to be fixed",
            username: "rohit",
        },
        {
            field: "Packers and Movers",
            description: "Need to move a sofa across town",
            username: "varun",
        },
        {
            field: "Housework",
            description: "Someone to sweep and do the dishes",
            username: "karun",
        },
        {
            field: "Electrician",
            description: "Need to fix the ceiling fan",
            username: "varun",
        },
        {
            field: "Electrician",
            description: "The washing machine needs to be fixed",
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
