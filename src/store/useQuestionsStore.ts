import { create } from 'zustand'

interface QuestionsState {
  questions: Question[],
  currentQuestion: number,
  fetchQuestions: (limit: number) => Promise<void>
}

const useQuestionsStore = create<QuestionsState>((set) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit: number) => {
    const res = await fetch(`/root-questions.json`)
    const json = await res.json()
    const questions = json.rootQuestions.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },
}))

export default useQuestionsStore