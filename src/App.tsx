import Game from './components/Game'
import Start from './components/Start'
import { useQuestionsData } from './hooks/useQuestionsData'
import useQuestionsStore from './store/useQuestionsStore'

export default function App() {
  const questions = useQuestionsStore(state => state.questions)
  const { unanswered } = useQuestionsData()

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center gap-8 bg-slate-900 text-gray-200 pb-60'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-9xl font-bold'>Luis <span className='text-yellow-400'>Daniel</span> Prendas</h1>
        <h2 className='text-xl'>Luis Prendas Chavarria</h2>
      </div>

      {questions.length === 0 && <Start />}
      {questions.length > 0 && unanswered > 0 && <Game />}

      <small className='opacity-60 absolute bottom-8 text-lg font-light'>Desarrollado con React + TypeScript + Zustand</small>
    </main>
  )
}
