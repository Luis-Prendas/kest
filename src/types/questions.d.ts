interface Question {
    question: string,
    code: string,
    answers: string[],
    correctAnswer: number,
    userAnswer: number | null
}