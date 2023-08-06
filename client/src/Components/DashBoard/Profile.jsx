import { Box, Center, Heading, Text, Card, CardHeader, CardBody, CardFooter, Button, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

function Profile() {
    const [questionsdata, setQuestionsdata] = useState([]);

    useEffect(() => {
        getProfileQuestions();
    }, [questionsdata]);

    const getProfileQuestions = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/getprofile/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: localStorage.getItem("username") }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            setQuestionsdata(data);
            console.log(questionsdata)
        } catch (error) {
            console.error("Error:", error);
            // setScore(0);
            // setShowResult(true);
        }
    };


    const getProfileQuestionsDelete = async (id) => {
        try {
            const response = await fetch("http://localhost:8000/api/getprofiledelete/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quesid: id }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }


            // const data = await response.json();
            // console.log(data);
            // setQuestionsdata(data);
            // console.log(questionsdata)
        } catch (error) {
            console.error("Error:", error);
            // setScore(0);
            // setShowResult(true);
        }
    };

    return (
        <Box>
            <Navbar />
            <Box p={10}>
                <Heading mt={7}>My profile</Heading>

                <Box mt={10} maxW={"3xl"}>
                    {Array.isArray(questionsdata) && questionsdata.length > 0 ? (
                        questionsdata.map((user) => (
                            <Container mt={5} key={user.id}>
                                <Card>
                                    <CardHeader display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                        <Heading size='md'>{user.username}</Heading>
                                        <Text>{user.created_at}</Text>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>{user.question1}</Text>
                                        <Text>{user.question2}</Text>
                                        <Text>{user.question3}</Text>
                                        <Text>{user.question4}</Text>
                                        <Text>{user.question5}</Text>
                                        <Text>{user.uuid}</Text>

                                        <Text>Correct answers : {user.scoredata} / 5</Text>



                                    </CardBody>
                                    <CardFooter>
                                        <Button onClick={() => getProfileQuestionsDelete(user.uuid)} colorScheme='red'>Delete</Button>
                                    </CardFooter>
                                </Card>
                            </Container>
                        ))
                    ) : (
                        <Text>No questions data available.</Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Profile;
