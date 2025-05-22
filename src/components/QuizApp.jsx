import { useState } from "react";
import "./QuizApp.css";
import { questionsSetOne } from "./questionSets";
import { questionsSetTwo } from "./questionSets";
const questions = questionsSetTwo;

export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = questions[currentQuestionIndex];
  const scorePercentage = (score / questions.length) * 100;

  const handleAnswer = (answer) => {
    if (showFeedback) return; // förhindra klick när feedback visas

    let isCorrect = false;

    if (question.type === "multipleChoice") {
      isCorrect = answer === question.correctAnswer;
    } else if (question.type === "trueFalse") {
      const normalizedAnswer = answer.toLowerCase() === "sant";
      isCorrect = normalizedAnswer === question.correct;
    }

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className={`quiz-container ${scorePercentage > 75 ? "celebrate" : ""}`}>
        <h1 className="quiz-title">Resultat</h1>
        <p className="quiz-score">Du fick {score} av {questions.length} rätt.</p>
        {scorePercentage > 75 && (
          <div className="confetti-message">
            🎉 Fantastiskt jobbat! Du klarade över 75%! 🎉
          </div>
        )}
        <button
          className="quiz-button"
          onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setShowScore(false);
            setShowFeedback(false);
            setSelectedAnswer(null);
          }}
        >
          Börja om
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-card-content">
          <h2 className="quiz-question-number">
            Fråga {currentQuestionIndex + 1} av {questions.length}
          </h2>

          {question.type === "trueFalse" ? (
            <>
              <p className="quiz-question-text">{question.statement}</p>
              <div className="quiz-options">
                {["Sant", "Falskt"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="quiz-button"
                    disabled={showFeedback}
                    style={
                      showFeedback
                        ? opt === selectedAnswer
                          ? { backgroundColor: (selectedAnswer.toLowerCase() === "sant" ? question.correct : !question.correct) ? "lightgreen" : "salmon" }
                          : {}
                        : {}
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className="quiz-feedback">
                  {selectedAnswer.toLowerCase() === "sant" ? (
                    question.correct ? (
                      <p>Rätt!</p>
                    ) : (
                      <>
                        <p>Fel!</p>
                        <p>Korrekt påstående: {question.correctAnswer}</p>
                      </>
                    )
                  ) : (
                    !question.correct ? (
                      <p>Rätt!</p>
                    ) : (
                      <>
                        <p>Fel!</p>
                        <p>Korrekt påstående: {question.correctAnswer}</p>
                      </>
                    )
                  )}
                  <button className="quiz-button" onClick={handleNext}>
                    Nästa fråga
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="quiz-question-text">{question.question}</p>
              <div className="quiz-options">
                {question.options.map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(opt)}
                    className="quiz-button"
                    disabled={showFeedback}
                    style={
                      showFeedback
                        ? opt === selectedAnswer
                          ? opt === question.correctAnswer
                            ? { backgroundColor: "lightgreen" }
                            : { backgroundColor: "salmon" }
                          : {}
                        : {}
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className="quiz-feedback">
                  {selectedAnswer === question.correctAnswer ? (
                    <p>Rätt!</p>
                  ) : (
                    <>
                      <p>Fel!</p>
                      <p>Korrekt svar: {question.correctAnswer}</p>
                    </>
                  )}
                  <button className="quiz-button" onClick={handleNext}>
                    Nästa fråga
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}