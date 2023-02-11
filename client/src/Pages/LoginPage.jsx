import {
    Box,
    Center,
    Divider,
    Flex,
    useColorMode,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Radio,
    RadioGroup,
    Image,
    AspectRatio,
    GridItem,
    Grid,
    Heading,
    Link,
    Checkbox,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import HomeImage from "../assets/landing-image.jpg";

export default function LoginPage() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /*
  after logging in we set Auth to an objectuser{username:"",role:""}
  and then write this statement
  
  */

    const validateData = () => {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateData()) {
            //api login
            const resp = await fetch("http://localhost:5000/user/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            //
            const data = await resp.json();
            if (resp.status === 200) {
                //Can replace with a toast or popup
                console.log("login done");
                setAuth({ user: data.username, role: data.role });
                console.log(auth);
                navigate(from, { replace: true });
            } else {
                window.alert("Invalid username/password"); //Can replace with a toast or popup
            }
        }
    };

    return (
        <Stack minH={"85vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Center marginLeft="2rem">
                    <Box
                        maxW="sm"
                        borderWidth="1px"
                        rounded="lg"
                        p="6"
                        width="25rem"
                    >
                        <Center>
                            <Box>Login Here</Box>
                        </Center>
                        <form onSubmit={handleSubmit} method="POST">
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel htmlFor="username">
                                        Username
                                    </FormLabel>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>

                                <Button type="submit">Login</Button>
                            </Stack>
                        </form>
                    </Box>
                </Center>
            </Flex>

            <Flex flex={2}>
                <Image alt={"Home Image"} objectFit={"cover"} src={HomeImage} />
            </Flex>
        </Stack>
    );
}

{
    /* <div style={{ display: "flex" }}>
    <Center marginLeft="2rem">
        <Box maxW="sm" borderWidth="1px" rounded="lg" p="6" width="25rem">
            <Center>
                <Box>Login Here</Box>
            </Center>
            <form onSubmit={handleSubmit} method="POST">
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <FormLabel htmlFor="role">Role</FormLabel>
                    <RadioGroup id="role" onChange={setRole} value={role}>
                        <Stack direction="row">
                            <Radio value="client">Client</Radio>
                            <Radio value="worker">Worker</Radio>
                        </Stack>
                    </RadioGroup>

                    <Button type="submit">Login</Button>
                </Stack>
            </form>
        </Box>
    </Center>
     <Center h="85vh" margin="0 2rem">
                <Divider
                    orientation="vertical"
                    size="xl"
                    borderColor={
                        colorMode === "dark" ? "yellow.100" : "black.300"
                    }
                />
            </Center> 
    <Box width="40rem" margin="0 auto" marginTop="2rem">
        <Image
            src={HomeImage}
            alt="Landing page image"
            style={{ backgroundSize: "cover", width: "100%" }}
        />
    </Box>
</div>; */
}
