import useQuestionsStore from "../store/useQuestionsStore"

const LIMIT_QUESTIONS = 3

export default function Start({ setShowLeaderboard }: { setShowLeaderboard: React.Dispatch<React.SetStateAction<boolean>> }) {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

    const handleClick = () => {
        fetchQuestions(LIMIT_QUESTIONS)
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <button onClick={handleClick} className="bg-indigo-600 p-4 w-60 rounded text-xl hover:bg-indigo-500 transition-colors">
                Empezar
            </button>
            <button onClick={() => setShowLeaderboard(true)} className="bg-indigo-600 p-4 w-60 rounded text-xl hover:bg-indigo-500 transition-colors">
                Leaderboard
            </button>
        </section>
    )
}