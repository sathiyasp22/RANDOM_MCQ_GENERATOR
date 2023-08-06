import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    
    Stack,

    Button,
    Heading,
    Text,
 
} from "@chakra-ui/react";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
    const navigate = useNavigate();

    

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
                
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", username)
                navigate("/");
                window.location.reload()
            } else {
                alert("Invalid Username Or Password");

                console.log("Login failed");
            }
        }
    };






    return (
        <div>
            
            <Flex align={"center"} justify={"center"}>
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    </Stack>
                    <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                        <Stack spacing={4}>
                            <FormControl>
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
            
        </div>
    );
}

export default Login;
