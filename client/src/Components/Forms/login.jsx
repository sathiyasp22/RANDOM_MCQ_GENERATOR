import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,

    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [token, setToken] = useState("");
    const navigate = useNavigate();

    // Check if the user is already logged in
    // useEffect(() => {
    //     const userToken = localStorage.getItem("token");
    //     if (userToken) {
    //         setToken(userToken);
    //     }
    // }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "" || password === " ") {
            alert("Please fill the field first");
        } else {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", username)
                navigate("/home");
                window.location.reload()
            } else {
                alert("Invalid Username Or Password");

                console.log("Login failed");
            }
        }
    };






    return (
        <div>
            {/* {token ? (
                <div>
                    <Heading mt={5}>Home Page</Heading>
                    <Button mt={4} onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            ) : ( */}
            <Flex align={"center"} justify={"center"}>
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    </Stack>
                    <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>UserName</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={handleLogin}
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                            <Text>
                                Don't have an account <Link to={"/signup"}>Sign up</Link>
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            {/* )} */}
        </div>
    );
}

export default Login;
