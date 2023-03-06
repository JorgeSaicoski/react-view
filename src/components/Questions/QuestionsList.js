import React from "react";

function QuestionsList({ questions, onSelectQuestion }) {
    return (
        <ul>
            {questions.map((question) => (
                <li key={question.id}>
                    <button onClick={() => onSelectQuestion(question)}>
                        {question.text} {question.answer ? "(respondida)" : "(sin responder)"}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default QuestionsList