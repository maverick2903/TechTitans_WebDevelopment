import { ReactNode } from "react";
import {
    Stack,
    Container,
    Box,
    Flex,
    Text,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { textsx } from "../Themes/sxThemes";

export default function Aboutus() {
    return (
        <Box bg={"gray.800"} position={"relative"}>
            <Flex
                flex={1}
                zIndex={0}
                display={{ base: "none", lg: "flex" }}
                backgroundImage="url('/templates/stats-grid-with-image.png')"
                backgroundSize={"cover"}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                position={"absolute"}
                width={"50%"}
                insetY={0}
                right={0}
            >
                <Flex
                    bgGradient={"linear(to-r, gray.800 10%, transparent)"}
                    w={"full"}
                    h={"full"}
                />
            </Flex>
            <Container maxW={"7xl"} zIndex={10} position={"relative"}>
                <Stack direction={{ base: "column", lg: "row" }}>
                    <Stack
                        flex={1}
                        color={"gray.400"}
                        justify={{ lg: "center" }}
                        py={{ base: 4, md: 20, xl: 60 }}
                    >
                        <Box mb={{ base: 8, md: 20 }}>
                            <Text
                                fontFamily={"heading"}
                                fontWeight={700}
                                textTransform={"uppercase"}
                                mb={3}
                                fontSize={"xl"}
                                color={"gray.500"}
                            >
                                Technology
                            </Text>
                            <Heading
                                color={"white"}
                                mb={5}
                                fontSize={{ base: "3xl", md: "5xl" }}
                            >
                                Truly innovative technology
                            </Heading>
                            <Text fontSize={"xl"} color={"gray.400"}>
                                The GigGuru website allows you to either
                                effortlessly choose people to perform jobs as a
                                client or connect workers with great
                                opportunites to work
                            </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            {stats.map((stat) => (
                                <Box key={stat.title}>
                                    <Text
                                        fontFamily={"heading"}
                                        fontSize={"3xl"}
                                        color={"white"}
                                        mb={3}
                                    >
                                        {stat.title}
                                    </Text>
                                    <Text fontSize={"xl"} color={"gray.400"}>
                                        {stat.content}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                    <Flex flex={1} />
                </Stack>
            </Container>
        </Box>
    );
}

const StatsText = ({ children }: { children: ReactNode }) => (
    <Text as={"span"} fontWeight={700} color={"white"}>
        {children}
    </Text>
);

const stats = [
    {
        title: "10+",
        content: (
            <>
                <StatsText>Software modules</StatsText> for detailed monitoring
                and real-time analytics
            </>
        ),
    },
    {
        title: "24/7",
        content: (
            <>
                <StatsText>Analytics</StatsText> enabled right in your dashboard
                without history limitations
            </>
        ),
    },
    {
        title: "13%",
        content: (
            <>
                <StatsText>Customers</StatsText> in India have chosen GigGuru™
                as their management solution
            </>
        ),
    },
    {
        title: "250M+",
        content: (
            <>
                <StatsText>Jobs</StatsText> connected and provided through
                GigGuru™ software
            </>
        ),
    },
];
