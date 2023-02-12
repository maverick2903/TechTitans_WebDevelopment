import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    Stack,
    Text,
    Link,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { textsx, textButtonsx } from "../Themes/sxThemes";
import { useLocation, useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validateForm";

const ClientSignUp = () => {
    const { auth, setAuth } = useAuth();
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [feedback, setFeedback] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const password = location.state.password;
    const username = location.state.username;
    const role = location.state.role;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            validateForm(
                { username, password, role, mobile: contactNumber },
                setFeedback,
                "client"
            )
        ) {
            console.log(location.state);
            const resp = await fetch("http://localhost:5000/client/newClient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    name,
                    mobile: contactNumber,
                    username,
                    role,
                }),
            });
            const data = await resp.json();
            if (resp.status === 200) {
                console.log("login done");
                setAuth({ user: data.username, role: data.role });
                navigate("/clientpage");
            } else {
                window.alert("Invalid credentials");
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
                <Text sx={textsx}> You are almost done!</Text>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} sx={textsx}>
                        <div className="parent">
                            <FormControl>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                        </div>

                        <div className="parent">
                            <FormControl>
                                <FormLabel htmlFor="contactNumber">
                                    Contact Number
                                </FormLabel>
                                <Input
                                    id="contactNumber"
                                    type="text"
                                    value={contactNumber}
                                    onChange={(e) =>
                                        setContactNumber(e.target.value)
                                    }
                                />
                            </FormControl>
                        </div>

                        <Box justifyItems="center">
                            <Button
                                sx={textButtonsx}
                                justifySelf="center"
                                height={{
                                    sm: "23px",
                                    md: "34px",
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
                                Enter
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default ClientSignUp;
