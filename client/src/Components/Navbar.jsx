import {
    useColorMode,
    Flex,
    Heading,
    HStack,
    Link,
    Spacer,
    IconButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Navlinksx, titleLogosx, iconsx } from "../Themes/sxThemes";
import useAuth from "../Hooks/useAuth";
import Logo from "../assets/logo.png";

export default function Navbar() {
    const { Auth } = useAuth();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            sx={Navlinksx}
            as="nav"
            alignItems="center"
            gap="10px"
            my="9px"
            height="5vh"
            marginBottom="1rem"
        >
            <img
                src={Logo}
                alt="Website logo"
                style={{ width: "3rem", marginLeft: "10px" }}
            />
            <Heading marginLeft="5px" sx={titleLogosx}>
                GigGuru
            </Heading>
            <Spacer />

            <HStack gap={5}>
                {Auth?.user?.role === "client" && (
                    <Link as={NavLink} to="/userpagerequest">
                        Send Request
                    </Link>
                )}
                {Auth?.user?.role === "worker" && (
                    <Link as={NavLink} to="/userpagerequest">
                        Client itneractions
                    </Link>
                )}

                <Link as={NavLink} to="/aboutus" style={{ fontSize: "2rem" }}>
                    About us
                </Link>
                {!Auth && (
                    <Link
                        as={NavLink}
                        to="/contactus"
                        style={{ fontSize: "2rem" }}
                    >
                        Contact us
                    </Link>
                )}

                <IconButton
                    sx={iconsx}
                    onClick={() => {
                        toggleColorMode();
                    }}
                    icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                />
            </HStack>
        </Flex>
    );
}
