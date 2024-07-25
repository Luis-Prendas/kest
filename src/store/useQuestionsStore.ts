import { create } from 'zustand'
import confetti from 'canvas-confetti'

interface QuestionsState {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

const useQuestionsStore = create<QuestionsState>((set, get) => ({
  questions: [],

  currentQuestion: 0,

  fetchQuestions: async (limit: number) => {
    const res = await fetch(`/root-questions.json`)
    const json = await res.json()
    const questions = json.rootQuestions.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },

  selectAnswer: (questionId: number, answerIndex: number) => {
    const { questions, goNextQuestion } = get()

    // usar el structuredClone para clonar el objeto
    const newQuestions = structuredClone(questions)

    // encontramos el índice de la pregunta
    const questionIndex = newQuestions.findIndex((q: Question) => q.id === questionId)

    // obtenemos la información de la pregunta
    const questionInfo = newQuestions[questionIndex]

    // averiguamos si el usuario ha seleccionado la respuesta correcta
    const isCorrect = questionInfo.correctAnswer === answerIndex

    if (isCorrect) confetti()

    // cambiar esta información en la copia de la pregunta
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrect,
      userAnswer: answerIndex
    }
    // actualizamos el estado
    set({ questions: newQuestions })
  },

  goNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },

  goPrevQuestion: () => {
    const { currentQuestion } = get()
    const previousQuestion = currentQuestion - 1

    if (previousQuestion >= 0) {
      set({ currentQuestion: previousQuestion })
    }
  },

  reset: () => {
    set({ currentQuestion: 0, questions: [] })
  }
}))

export default useQuestionsStore