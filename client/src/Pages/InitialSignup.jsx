import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    Stack,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { textsx, textButtonsx } from "../Themes/sxThemes";
import { validateForm } from "../utils/validateForm";

function InitialSignup() {
    const toast = useToast()
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { auth, setAuth } = useAuth();
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm({ username, password, role }, setFeedback, "signup")) {

            const resp = await fetch("http://localhost:5000/user/newUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    role,
                }),
            });
            const data = await resp.json();
            const { token, user } = data;
            const prevPageData = { username, password, role };
            if (resp.status === 200) {
                localStorage.setItem("jsonwebtoken", token);
                toast({
                    title: 'Account created!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position:"bottom-right"
                  })

                setAuth({ user: user.username, role: user.role });
            } else {
                toast({
                    title: 'There was an error! please try again',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position:"bottom-right"
                  })
            }
            if (role === "client") {
                navigate("/clientsignup", { state: prevPageData });
            } else if (role === "worker") {
                navigate("/workersignup", { state: prevPageData });
            }
        }
    };

    return (
        <div className="workersignup">
            <Box
                maxW="md"
                width="50%"
                borderWidth="1px"
                border="2px solid"
                rounded="lg"
                p="6"
                m="auto"
                textAlign="center"
            >
                <form onSubmit={handleSubmit}>
                    <Stack sx={textsx} spacing={4} method="post">
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

                        <Box>
                            <FormLabel htmlFor="role">Role</FormLabel>
                            <RadioGroup
                                id="role"
                                onChange={setRole}
                                value={role}
                            >
                                <Stack direction="row">
                                    <Radio value="client">Client</Radio>
                                    <Radio value="worker">Worker</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>

                        <Box>
                            <Button
                                m="auto"
                                sx={textButtonsx}
                                justifySelf="center"
                                height={{
                                    sm: "23px",
                                    md: "38px",
                                    lg: "43px",
                                    xl: "52px",
                                }}
                                width={{
                                    sm: "150px",
                                    md: "180px",
                                    lg: "200px",
                                    xl: "230px",
                                }}
                                type="submit"
                            >
                                Sign up
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </div>
    );
}

export default InitialSignup;
