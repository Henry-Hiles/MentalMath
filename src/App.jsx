import { useEffect, useState } from "react"
import { FaEquals, FaMinus, FaPlus } from "react-icons/fa"
import { SlCheck, SlClose } from "react-icons/sl"
import { Nav } from "./components/Nav"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { Modes } from "./Modes"
import styles from "./styles/App.module.css"

const randomNumber = () => Math.floor(Math.random() * 100) + 1

export const App = () => {
    const [mode, setMode] = useLocalStorage("mode", Modes.Addition)
    const [modeNumbers, setModeNumbers] = useLocalStorage("modeNumbers", 3)
    const [numbers, setNumbers] = useState()
    const [index, setIndex] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [answerTimeout, setAnswerTimeout] = useState()
    const [correctAnswer, setCorrectAnswer] = useState()
    const [correctAnswerTimeout, setCorrectAnswerTimeout] = useState()

    const Operator = () => (mode == Modes.Addition ? <FaPlus /> : <FaMinus />)

    const getCorrectAnswer = (answerIndex = index) =>
        numbers[answerIndex]?.reduce((accumulator, currentValue) => {
            console.log(accumulator, currentValue)
            return mode == Modes.Addition
                ? accumulator + currentValue
                : accumulator - currentValue
        }) || "Unknown"

    useEffect(() => {
        clearTimeout(correctAnswerTimeout)
        setCorrectAnswerTimeout(setTimeout(() => setCorrectAnswer(), 5000))

        return () => clearTimeout(correctAnswerTimeout)
    }, [correctAnswer])

    useEffect(() => {
        setNumbers(
            [...new Array(20)].map(() =>
                [...new Array(modeNumbers)].map((_, index) =>
                    index == 0
                        ? randomNumber() * 2
                        : Math.ceil(
                              randomNumber() /
                                  (mode == Modes.Subtraction
                                      ? modeNumbers * 0.4
                                      : 1)
                          )
                )
            )
        )
        setCorrectAnswers(0)
        setIndex(0)
        clearTimeout(answerTimeout)
    }, [mode, modeNumbers])

    return (
        <>
            <Nav
                mode={mode}
                setMode={setMode}
                modeNumbers={modeNumbers}
                setModeNumbers={setModeNumbers}
            />
            <div className={styles.container}>
                <h1>
                    Correct Answers: {correctAnswers}/{index}
                </h1>
                <h1>
                    Completed questions: {index}/{numbers?.length}
                </h1>
                {index === numbers?.length ? (
                    <h1>Complete.</h1>
                ) : (
                    <h3 className={styles.numbers}>
                        {numbers?.[index].map((number, index) => (
                            <span key={index}>
                                {index == 0 || <Operator />} {number}{" "}
                            </span>
                        ))}
                        <FaEquals />{" "}
                        <input
                            type="number"
                            autoFocus
                            className={styles.input}
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" &&
                                    event.target.value
                                ) {
                                    clearTimeout(answerTimeout)

                                    const isCorrect =
                                        event.target.value == getCorrectAnswer()

                                    if (isCorrect)
                                        setCorrectAnswers(
                                            (answers) => ++answers
                                        )

                                    setIndex((index) => ++index)

                                    setCorrectAnswer(isCorrect)

                                    event.target.value = ""
                                    if (index + 1 != numbers?.length)
                                        setAnswerTimeout(
                                            setTimeout(() => {
                                                setCorrectAnswer(false)
                                                setIndex((index) => ++index)
                                            }, 15000)
                                        )
                                }
                            }}
                        />
                    </h3>
                )}
                {correctAnswer === false && (
                    <h1 className={styles.wrongAnswer}>
                        <SlClose /> Wrong Answer.{" "}
                        <span>
                            Correct Answer: {getCorrectAnswer(index - 1)}
                        </span>
                    </h1>
                )}

                {correctAnswer === true && (
                    <h1 className={styles.correctAnswer}>
                        <SlCheck /> Correct!
                    </h1>
                )}
            </div>
        </>
    )
}
