import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Box,
  Text,
  Container,
  Button,
} from "@chakra-ui/react";
function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    fetch("http://localhost:8000/api/generate/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("CHECK YOUR NETWORK CONNECTION");
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error("Error:", error);
        setQuestions([]);
      });
  };

  const handleAnswerSelect = (questionId, selectedChoice) => {
    const answer = { question_id: questionId, selected_choice: selectedChoice };
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);

    const question = questions.find((q) => q.id === questionId);
    const isCorrect = selectedChoice === question.correct_choice;

    if (isCorrect) {
      console.log("CORRECT ANSWER 🤩🤩🤩");

      alert("CORRECT ANSWER 🤩🤩🤩");
    } else {
      alert("WRONG ANSWER 🤔🤔🤔");
    }
  };

  const submitAnswers = () => {
    fetch("http://localhost:8000/api/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_answers: userAnswers }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("CHECK YOUR NETWORK CONNECTION !!!");
        }
        return response.json();
      })
      .then((data) => {
        setScore(data.score);
        setShowResult(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setScore(0);
        setShowResult(true);
      });
  };

  return (
    <div className="">
      {showResult ? (
        <Box mt={10}>
          {/* <Heading mt={5}></Heading> */}

          <Container mt={10}>
            <Card>
              <CardHeader>
                <Heading size="md" fontSize={"3xl"} mt={5}>
                  Result Summary
                </Heading>
              </CardHeader>

              <CardBody>
                <Text fontSize={"2xl"}>
                  {" "}
                  Correct Answers: {score} / {questions.length}
                </Text>
              </CardBody>
            </Card>
          </Container>
        </Box>
      ) : (
        <Box>
          {questions.map((question) => (
            <Container key={question.id}>
              <Card mt={10} mb={10}>
                <CardHeader>
                  <Heading size="md">{question.question_text}</Heading>
                </CardHeader>

                <CardBody>
                  <Flex
                    align={"center"}
                    justifyContent={"space-between"}
                    spacing="4"
                  >
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice1)
                        }
                      >
                        1. {question.choice1}
                      </Button>
                    </Box>
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice2)
                        }
                      >
                        2. {question.choice2}
                      </Button>
                    </Box>
                  </Flex>
                  <Flex
                    align={"center"}
                    justifyContent={"space-between"}
                    spacing="4"
                  >
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice3)
                        }
                      >
                        3. {question.choice3}
                      </Button>
                    </Box>
                    <Box mb={5}>
                      <Button
                        onClick={() =>
                          handleAnswerSelect(question.id, question.choice4)
                        }
                      >
                        4. {question.choice4}
                      </Button>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Container>
          ))}
          <Container mb={20}>
            <Button width={"full"} colorScheme="blue" onClick={submitAnswers}>
              SUBMIT
            </Button>
          </Container>
        </Box>
      )}
    </div>
  );
}

export default App;
