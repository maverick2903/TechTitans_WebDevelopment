import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Stack,
  Text,
  VStack,
  Select,
} from "@chakra-ui/react";
import { textsx, textButtonsx } from "../Themes/sxThemes"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const WorkerSignUp = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");
  const [field, setField ] = useState()
  const location = useLocation()
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  
  const password = location.state.password
  const username = location.state.username

  const handleChange = (e) =>{
    setField(e.target.value)
    console.log(field)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("field is\n")
    console.log(field)
    const resp = await fetch("http://localhost:5000/worker/newWorker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, mobile: contactNumber, city, username, password, field
      }),
    });

    const data = await resp.json()
    if (resp.status === 200) {
      console.log("login done");
      setAuth({ user: data.username, role: data.role });
      console.log(auth);
      if(data.role=="client"){
        navigate("/clientpage");
      }else{
        navigate("/workerpage")
      }
  } else {
      window.alert("Invalid credentials");
    }

  };

  return (
    <div className="workersignup">
      <Box maxW="md" width="50%" borderWidth="1px" border="2px solid" rounded="lg" p="6" m="auto" textAlign="center" >
        <Text sx={textsx} mb="24px"> You are almost done!</Text>
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
                <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
                <Input
                  id="contactNumber"
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </FormControl>
            </div>

            <div className="parent">
              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
            </div>

            <div className="parent">
              <FormControl>
                <FormLabel htmlFor="field">Select category of work</FormLabel>
                <Select
                  placeholder="Select option"
                  id="field"
                  value={field}
                  onChange={handleChange}
                >
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Packers and Movers">Packers and Movers</option>
                  <option value="Housework">Housework</option>
                </Select>
              </FormControl>
            </div>

            <Box>
              <Button m="auto" sx={textButtonsx} justifySelf="center" height={{ sm: "23px", md: "30px", lg: "43px", xl: "52px" }} width={{ sm: "150px", md: "180px", lg: "200px", xl: "230px" }} type="submit">Sign up</Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default WorkerSignUp;
