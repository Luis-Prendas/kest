import { ChevronLeft, ChevronRight } from "lucide-react";
import useQuestionsStore from "../store/useQuestionsStore";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsData } from "../hooks/useQuestionsData";

const getBackgroundColor = (info: Question, index: number) => {
  const { userAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userAnswer == null) return 'transparent'
  // si ya selecciono pero la solución es incorrecta
  if (index !== correctAnswer && index !== userAnswer) return 'transparent'
  // si esta es la solución correcta
  if (index === correctAnswer) return 'bg-green-500'
  // si esta es la selección del usuario pero no es correcta
  if (index === userAnswer) return 'bg-red-500'
  // si no es ninguna de las anteriores
  return 'transparent'
}

export default function Game() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)
  const questions = useQuestionsStore(state => state.questions)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const questionInfo = questions[currentQuestion]

  const handleClick = (answerIndex: number) => () => {
    if (questionInfo.userAnswer === null) {
      selectAnswer(questionInfo.id, answerIndex)
    }
  }

  return (
    <section className="bg-slate-950 p-4 rounded flex flex-col items-center justify-center gap-4">
      <header className="flex justify-between items-center gap-4">
        <button disabled={currentQuestion === 0} className={currentQuestion === 0 ? "opacity-30" : ""}><ChevronLeft className="w-8 h-8" onClick={goPrevQuestion} /></button>
        <span>{currentQuestion + 1} / {questions.length}</span>
        <button disabled={currentQuestion >= questions.length - 1} className={currentQuestion >= questions.length - 1 ? "opacity-30" : ""}><ChevronRight className="w-8 h-8" onClick={goNextQuestion} /></button>
      </header>
      <main className="w-[700px]">
        <h2 className="text-xl text-center mb-4 font-bold text-pretty">{questionInfo.question}</h2>
        <SyntaxHighlighter language="javascript" style={gradientDark} wrapLines={true} showLineNumbers={true} >
          {questionInfo.code}
        </SyntaxHighlighter>
        <ul>
          {questionInfo.answers.map((answer, index) => (
            <li key={index} onClick={handleClick(index)} className={`flex justify-center items-center gap-4 p-2 bg-slate-900 cursor-pointer outline outline-1 outline-white/10 hover:outline-white/50 transition-all ${getBackgroundColor(questionInfo, index)}`}>
              {answer}
            </li>
          ))}
        </ul>
        {questionInfo.userAnswer !== null && (
          <p className="text-lg text-pretty mt-4 p-4 bg-slate-800 rounded">{questionInfo.explanation}</p>
        )}
      </main>
      <footer className="flex flex-col justify-center items-center gap-4">
        <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
        <button onClick={() => reset()} className="bg-indigo-600 p-2 px-8 rounded hover:bg-indigo-500 transition-colors">
          Resetear juego
        </button>
      </footer>
    </section>
  )
}