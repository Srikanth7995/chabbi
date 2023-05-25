/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react'
import './TypingBox.css'

function TypingBox() {
  const [input, setInput] = useState('')
  const [sentencesTyped, setSentencesTyped] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [timeRemaining, setTimeRemaining] = useState(300)
  const [nextSentence, setNextSentence] = useState(generateNextSentence())
  const [isCorrectSentence, setIsCorrectSentence] = useState(true)

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeRemaining])

  const handleInputChange = e => {
    const typedSentence = e.target.value.trim()
    const expectedSentence = nextSentence

    if (typedSentence === expectedSentence) {
      setSentencesTyped(prevSentencesTyped => prevSentencesTyped + 1)
      setIsCorrectSentence(true)
      setInput('') // Clear the input when the sentence is correct
      setNextSentence(generateNextSentence())
    } else {
      setAccuracy(((sentencesTyped * 100) / (sentencesTyped + 1)).toFixed(2))
      setIsCorrectSentence(false)
    }
    setInput(e.target.value)
  }

  const handleInputReset = () => {
    setInput('')
    setNextSentence(generateNextSentence())
    setSentencesTyped(0)
    setAccuracy(100)
    setTimeRemaining(300)
    setIsCorrectSentence(true)
  }

  function generateNextSentence() {
    const sentences = [
      'The quick brown fox jumps over the lazy dog.',
      'I love coding in ReactJS.',
      'This is a typing practice exercise.',
      'The sun is shining brightly.',
      'Keep calm and keep typing.',
      'Practice makes perfect.',
    ]
    const randomIndex = Math.floor(Math.random() * sentences.length)
    return sentences[randomIndex]
  }

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="typing-box">
      <textarea
        className={`input-area ${isCorrectSentence ? 'correct' : 'incorrect'}`}
        value={input}
        onChange={handleInputChange}
        placeholder="Type here..."
        disabled={timeRemaining <= 0}
      />
      <div className="stats-container">
        <div className="stats-item">
          <p>Sentences Typed: {sentencesTyped}</p>
        </div>
        <div className="stats-item">
          <p>Accuracy: {accuracy}%</p>
        </div>
        <div className="stats-item">
          <p>Time Remaining: {formatTime(timeRemaining)}</p>
        </div>
      </div>
      {timeRemaining <= 0 && (
        <button
          type="button"
          className="reset-button"
          onClick={handleInputReset}
        >
          Reset
        </button>
      )}
      <div className="next-sentence-container">
        <p className="next-sentence-text">Sentence: {nextSentence}</p>
      </div>
    </div>
  )
}

export default TypingBox
