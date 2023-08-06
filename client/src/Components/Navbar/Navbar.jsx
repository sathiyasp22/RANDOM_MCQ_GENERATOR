import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,

  useColorModeValue,
  Stack,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {  useNavigate ,NavLink} from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
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
    navigate('/login')
    window.location.reload()



  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight="bold" >💙BLUVAA💙 RANDOM MCQ GENERATOR</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button>
                <NavLink to={"/profile"} style={({ isActive }) => ({
                  color: isActive ? 'dodgerblue' : '#333',
                })}>
                  <Text>{localStorage.getItem("username")}</Text>

                </NavLink>
              </Button>

              <Button>
                <NavLink to={"/"} style={({ isActive }) => ({
                  color: isActive ? 'dodgerblue' : '#333',
                })}>
                  <Text>Home</Text>

                </NavLink>
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
