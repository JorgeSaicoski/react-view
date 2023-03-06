import React, {useState} from "react";
import {questionsList} from "../../data/data";
import QuestionsList from "../Questions/QuestionsList";
import QuestionDetail from "../Questions/QuestionDetail";

function Home() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([...questionsList]);

    function handleSelectQuestion(question) {
        const questionIndex = questions.findIndex((q) => q.id === question.id);
        setCurrentQuestionIndex(questionIndex);
    }

    const handleStopRecording = (question, recording) => {
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            const questionIndex = newQuestions.findIndex((q) => q.id === question.id);
            newQuestions[questionIndex] = {
                ...question,
                answer: true,
                recording: recording,
            };
            return newQuestions;
        });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex < questions.length ? nextIndex : prevIndex;
        });
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : prevIndex;
        });
    };

    const handleFinish = () => {
        console.log("Grabaciones:", questions.map((q) => q.recording));
    };

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div>
            <QuestionsList
                questions={questions}
                onSelectQuestion={handleSelectQuestion}
            />
            {currentQuestion && (
                <QuestionDetail
                    question={currentQuestion}
                    onStopRecording={handleStopRecording}
                />
            )}
            <button onClick={handlePreviousQuestion}>Anterior</button>
            {isLastQuestion ? (
                <button onClick={handleFinish} disabled={!currentQuestion}>
                    Terminar
                </button>
            ) : (
                <button onClick={handleNextQuestion} disabled={!currentQuestion}>
                    Siguiente
                </button>
            )}
        </div>
    );
}

export default Home;