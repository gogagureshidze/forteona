import React, { useState } from "react";
import "./quizzapp.css";

const QuizApp = () => {
  const questions = [
    {
      id: 1,
      question: "Which time of the year is your favorite?",
      options: ["Spring", "Summer", "Fall", "Winter"],
    },
    {
      id: 2,
      question: "Are you a cat person, dog person?",
      options: ["I Prefer Cats", "I Prefer Dogs"],
    },
    {
      id: 3,
      question:
        "What leisure activities do you enjoy??",
     
    },
    {
      id: 4,
      question:
        "Describe Your Perfect Day: If you could design your ideal day from morning till night, what would it look like?",
     
    },
    {
      id: 5,
      question:
        "If you could go on a dream vacation anywhere in the world, where would it be, and what activities would you love to do there?",
    },
    {
      id: 6,
      question:
        "Favorite Weekend Activity: Which one would you most likely choose?",
      options: [
        "Exploring new restaurants or cafes",
        "Hiking or outdoor adventures",
        "Visiting art galleries or museums",
        "Relaxing at home with a good book or movie",
      ],
    },
    {
      id: 7,
      question: "City Life or Countryside: Where would you rather live?",
      options: ["City Life", "Countryside"],
    },
    {
      id: 8,
      question:
        "The last Question is Around the Corner are you Ready to Answer it?",
      options: ["Yes", "No"],
    },
    {
      id: 9,
      question:
        "This is not a Joke, Will you be Brutally Honest Whilst Answering the Last Question?",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      question: "Teo... Will you go out With Me?",
      options: ["Yes", "No"],
    },
  ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(
      new Array(questions.length).fill("")
    );
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [answerRequired, setAnswerRequired] = useState(false);

    const handleAnswerSelection = (selectedOption) => {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestion] = selectedOption;
      setUserAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
      if (userAnswers[currentQuestion] !== "") {
        setAnswerRequired(false);
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else {
          setQuizCompleted(true);
        }
        if (currentQuestion === 8 && userAnswers[currentQuestion] === "No") {
          setUserAnswers(new Array(questions.length).fill(""));
          setCurrentQuestion(0);
        }
      } else {
        setAnswerRequired(true);
      }
    };



const renderQuiz = () => {
  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <h3>Your Answers:</h3>
        <ul className="answer-list">
          {questions.map((ques, index) => (
            <li key={index}>
              {ques.id}. {ques.question}: {userAnswers[index]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQues = questions[currentQuestion];


 return (
   <div className="quiz-container" key={currentQues.id}>
     <h3>
       {currentQues.id}. {currentQues.question}
     </h3>
     <form>
       {!currentQues.options && (
         <textarea
           rows="4"
           cols="50"
           value={userAnswers[currentQuestion]}
           onChange={(e) =>
             setUserAnswers([
               ...userAnswers.slice(0, currentQuestion),
               e.target.value,
               ...userAnswers.slice(currentQuestion + 1),
             ])
           }
           placeholder="Write your response here..."
           required
         />
       )}
       {currentQues.options && (
         <ul className="options-list">
           {currentQues.options.map((option, index) => (
             <li key={index}>
               <label>
                 <input
                   type="radio"
                   name="answer"
                   value={option}
                   checked={userAnswers[currentQuestion] === option}
                   onChange={() => handleAnswerSelection(option)}
                   required
                 />
                 {option}
               </label>
             </li>
           ))}
         </ul>
       )}
       {answerRequired && (
         <p className="error-message">
           Please select an answer or write a response!
         </p>
       )}
       <button type="button" onClick={handleNextQuestion}>
         Next
       </button>
     </form>
   </div>
 );
};

  return <div className="quiz-wrapper">{renderQuiz()}</div>;
};

export default QuizApp;