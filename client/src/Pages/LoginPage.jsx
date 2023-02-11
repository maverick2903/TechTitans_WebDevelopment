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
import { textsx, texttsx, textButtonsx } from "../Themes/sxThemes"
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import HomeImage from "../assets/abcd.svg";

export default function LoginPage() {
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

    const validateData = () => { return true };

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
                navigate(from, { replace: true });
            } else {
                window.alert("Invalid username/password"); //Can replace with a toast or popup
            }
        }
    };

    return (
        <Stack minH={"85vh"} direction={{ base: "column", md: "row" }} sx={textsx}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Center marginLeft="2rem">
                    <Box
                        border="2px solid"
                        maxW="sm"
                        borderWidth="1px"
                        rounded="lg"
                        p="6"
                        width="25rem"
                    >
                        <Center>
                            <Box >Login Here</Box>
                        </Center>
                        <form onSubmit={handleSubmit} method="POST">
                            <Stack spacing={4} >

                                <div className="parent">
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
                                </div>


                                <div className="parent">
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
                                </div>

                                <Box m="auto">
                                <Button m="auto" sx={textButtonsx} justifySelf="center" height={{ sm: "25px", md: "34px", lg: "43px", xl: "52px" }} width={{ sm: "150px", md: "165px", lg: "180px", xl: "185px" }} type="submit">Go</Button>
                                    <Link as={NavLink} margin={{sm:"20px",md:"51px",lg:"36px",xl:"20px"}} sx={texttsx} to='/signup'> sign up?
                                    </Link>
 
                                </Box>

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

