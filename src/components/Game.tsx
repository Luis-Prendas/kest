import { ChevronLeft, ChevronRight } from "lucide-react";
import useQuestionsStore from "../store/useQuestionsStore";

export default function Game() {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)

  return (
    <section>
      <header className="flex justify-between items-center gap-4">
        <button disabled={currentQuestion === 0} className={currentQuestion === 0 ? "opacity-30" : ""}><ChevronLeft className="w-8 h-8" /></button>
        <span>{currentQuestion + 1} / {questions.length}</span>
        <button disabled={currentQuestion >= questions.length - 1} className={currentQuestion >= questions.length - 1 ? "opacity-30" : ""}><ChevronRight className="w-8 h-8" /></button>
      </header>
      <main></main>
      <footer></footer>
    </section>
  )
}