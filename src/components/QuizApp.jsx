import { useState } from "react";
import "./QuizApp.css";

const questions = [
  {
    "type": "multipleChoice",
    "question": "Vilka tre faser kan ett ämne ha?",
    "options": [
      "Fast form, flytande form, gasform",
      "Vatten, ånga, is",
      "Syre, väte, kväve",
      "Kall, varm, het"
    ],
    "correctAnswer": "Fast form, flytande form, gasform"
  },
  {
    "type": "trueFalse",
    "statement": "Ändring av temperatur gör att ett ämne byter fas.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "Värme är energi som överförs från ett varmare till ett kallare föremål.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "När det blir varmare rör sig atomerna/molekylerna mindre och tar mindre plats.",
    "correct": false,
    "correctStatement": "De rör sig mer och tar större plats."
  },
  {
    "type": "trueFalse",
    "statement": "Solen är en glödande gasklot som ger värme och ljus till jorden.",
    "correct": true
  },
  {
    "type": "multipleChoice",
    "question": "Vad är stjärnor?",
    "options": [
      "Stora brinnande gasklot, liknande solen men längre bort",
      "Små stenar som lyser",
      "Planeter som reflekterar ljus",
      "Månar i andra solsystem"
    ],
    "correctAnswer": "Stora brinnande gasklot, liknande solen men längre bort"
  },
  {
    "type": "trueFalse",
    "statement": "Planeter är himlakroppar som rör sig i en bana runt en stjärna (som solen).",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "Månar är himlakroppar som rör sig i en bana runt planeter.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "En galax är en stor samling av stjärnor, planeter, gas och stoft.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "All materia är uppbyggd av atomer.",
    "correct": true
  },
  {
    "type": "multipleChoice",
    "question": "Vad är ett grundämne?",
    "options": [
      "Ett ämne som bara består av en sorts atomer",
      "En blandning av flera ämnen",
      "En kemisk förening",
      "En vätska"
    ],
    "correctAnswer": "Ett ämne som bara består av en sorts atomer"
  },
  {
    "type": "trueFalse",
    "statement": "En molekyl är två eller flera atomer som sitter ihop.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "En kemisk förening är ett ämne som består av olika sorters atomer.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "En kemisk reaktion är när ämnen reagerar med varandra och bildar nya ämnen.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "Exempel på en kemisk reaktion är när järn rostar eller när man eldar trä.",
    "correct": true
  },
  {
    "type": "multipleChoice",
    "question": "Vad menas med att ett ämne är brännbart?",
    "options": [
      "Det kan reagera med syre och börja brinna",
      "Det är varmt vid rumstemperatur",
      "Det kan blandas med vatten",
      "Det är ett lätt ämne"
    ],
    "correctAnswer": "Det kan reagera med syre och börja brinna"
  },
  {
    "type": "trueFalse",
    "statement": "Fotosyntes är en process där växter med hjälp av solljus omvandlar koldioxid och vatten till syre och socker.",
    "correct": true
  },
  {
    "type": "trueFalse",
    "statement": "Fotosyntesen är viktig eftersom den ger syre till luften och bygger upp växternas massa.",
    "correct": true
  },
  {
    "type": "multipleChoice",
    "question": "Vad är kolets kretslopp?",
    "options": [
      "Hur kolet cirkulerar i naturen mellan växter, djur och atmosfär",
      "Hur syre försvinner från luften",
      "Hur socker bildas i kroppen",
      "Hur atomer blandas i vatten"
    ],
    "correctAnswer": "Hur kolet cirkulerar i naturen mellan växter, djur och atmosfär"
  }
]


export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (showFeedback) return; // förhindra klick när feedback visas

    let isCorrect = false;

    if (question.type === "multipleChoice") {
      isCorrect = answer === question.correctAnswer;
    } else if (question.type === "trueFalse") {
      // använd boolean-värde på korrekthet
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
      <div className="quiz-container">
        <h1 className="quiz-title">Resultat</h1>
        <p className="quiz-score">Du fick {score} av {questions.length} rätt.</p>
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
                        <p>Korrekt påstående: {question.correctStatement}</p>
                      </>
                    )
                  ) : (
                    !question.correct ? (
                      <p>Rätt!</p>
                    ) : (
                      <>
                        <p>Fel!</p>
                        <p>Korrekt påstående: {question.correctStatement}</p>
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
