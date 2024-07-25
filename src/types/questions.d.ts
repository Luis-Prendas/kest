interface Question {
    id: number,
    question: string,
    code: string,
    answers: string[],
    correctAnswer: number,
    isCorrect: boolean,
    userAnswer: number | null,
    explanation: string
}