import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      setRefresh(true)
    }
  }, [refresh]);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("username")
    setRefresh(false)
    navigate('/')
    window.location.reload()



  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight="bold" > RANDOM MCQ GENERATOR</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button>
                <Link to={"/profile"}>
                  <Text>{localStorage.getItem("username")}</Text>

                </Link>
              </Button>

              <Button>
                <Link to={"/home"}>
                  <Text>Home</Text>

                </Link>
              </Button>


              {
                refresh ? (
                  <Button onClick={handleLogout}>

                    Logout
                  </Button>
                ) : (
                  <Button >
                    Sign in
                  </Button>
                )
              }

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>






            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
