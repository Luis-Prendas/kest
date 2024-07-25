import useQuestionsStore from "../store/useQuestionsStore"

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userAnswer, correctAnswer } = question
    if (userAnswer == null) unanswered++
    else if (userAnswer === correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered }
}