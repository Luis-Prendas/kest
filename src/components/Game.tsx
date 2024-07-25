import { ChevronLeft, ChevronRight } from "lucide-react";
import useQuestionsStore from "../store/useQuestionsStore";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsData } from "../hooks/useQuestionsData";

export default function Game() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const questionInfo = questions[currentQuestion]
  return (
    <section className="bg-slate-950 p-4 rounded flex flex-col items-center justify-center gap-4">
      <header className="flex justify-between items-center gap-4">
        <button disabled={currentQuestion === 0} className={currentQuestion === 0 ? "opacity-30" : ""}><ChevronLeft className="w-8 h-8" /></button>
        <span>{currentQuestion + 1} / {questions.length}</span>
        <button disabled={currentQuestion >= questions.length - 1} className={currentQuestion >= questions.length - 1 ? "opacity-30" : ""}><ChevronRight className="w-8 h-8" /></button>
      </header>
      <main className="w-[500px]">
        <SyntaxHighlighter language="javascript" style={gradientDark}>
          {questionInfo.code}
        </SyntaxHighlighter>
        <ul>
          {questionInfo.answers.map((answer, index) => (
            <li key={index} className="flex justify-center items-center gap-4 p-2 bg-slate-900 cursor-pointer outline outline-1 outline-white/10 hover:outline-white/50 transition-all">
              {answer}
            </li>
          ))}
        </ul>
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