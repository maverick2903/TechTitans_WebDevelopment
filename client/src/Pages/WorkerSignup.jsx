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
import { useToast } from '@chakra-ui/react'
import { textsx, textButtonsx, textttsx } from "../Themes/sxThemes"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { AttachmentIcon } from "@chakra-ui/icons"


const WorkerSignUp = () => {
  const imageUrls = [];
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");
  const [field, setField] = useState()
  const location = useLocation()
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [errorForFile, setErrorForFile] = useState(" ");
  const toast = useToast()


  const password = location.state.password
  const username = location.state.username

  const handleChange = (e) => {
    setField(e.target.value)
    console.log(field)
  }
  const validateFileType = (event) => {
    for (var i = 0; i < event.target.files.length; i++) {
      var filename = (event.target.files[i].name);
      var extensionName = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
      if (extensionName != "jpg" && extensionName != "png") {
        setErrorForFile("Valid file types are jpg/png")
        break;
      } else {
        setErrorForFile(event.target.files.length + " files selected")
      }
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorForFile == " " || errorForFile == "Valid file types are jpg/png") {
      return;
    }
    var imageFiles = document.getElementById("image")

    for (const file of imageFiles.files) {
      var formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", process.env.REACT_APP_upload_preset)

      const url = "https://api.cloudinary.com/v1_1/" + process.env.REACT_APP_cloud_name + "/image/upload"
      const respCloudinary = await fetch(url,
        {
          method: "POST",
          body: formData
        })
      if (respCloudinary.status === 200) {
        const respInJSON = await respCloudinary.json()
        const url = respInJSON.secure_url
        imageUrls.push(url)
      } 
    }

    
    const resp = await fetch("http://localhost:5000/worker/newWorker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, mobile: contactNumber, city, username, password, field,"idProof":imageUrls[0]
      }),
    });

    const data = await resp.json()
    if (resp.status === 200) {
      toast({
        title: 'There was an error in uploading the image to cloud please try again!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position:"bottom-right"
      })
      setAuth({ user: data.username, role: data.role });
      navigate("/workerpage")

    } else {
      toast({
        title: 'There was an error in uploading the image to cloud!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position:"bottom-right"
      })
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

            <Box sx={textttsx}>
              <div className="parent">
                <label htmlFor="image" id="vohvalalabel">
                  Upload goverment id<AttachmentIcon mr="27px" />
                </label>
                <input
                  onChange={validateFileType}
                  type="file"
                  id="image"
                  name="image"
                ></input>
                <span
                  className="Error"
                  dangerouslySetInnerHTML={{
                    __html: errorForFile,
                  }}
                ></span>
              </div>
            </Box>

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
