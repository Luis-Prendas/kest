import useQuestionsStore from "../store/useQuestionsStore"

const LIMIT_QUESTIONS = 2

export default function Start() {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

    const handleClick = () => {
        fetchQuestions(LIMIT_QUESTIONS)
    }
    
    return (
        <button onClick={handleClick} className="bg-indigo-600 p-4 w-60 rounded text-xl hover:bg-indigo-500 transition-colors">
            Empezar
        </button>
    )
}