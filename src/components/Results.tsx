import { useQuestionsData } from "../hooks/useQuestionsData"
import useQuestionsStore from "../store/useQuestionsStore"

export const Results = () => {
  const { correct, incorrect } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <div>
      <h1>¡Tus resultados</h1>

      <strong>
        <p>✅ {correct} correctas</p>
        <p>❌ {incorrect} incorrectas</p>
      </strong>

      <div>
        <button onClick={() => reset()} className="bg-indigo-600 p-4 w-60 rounded text-xl hover:bg-indigo-500 transition-colors">
          ¡Empezar de nuevo!
        </button>
      </div>
    </div>
  )
}