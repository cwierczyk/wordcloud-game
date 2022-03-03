import { useState } from 'react'
import './styles/Game.css'
import Button from './Button'

const Game = ({ question, words, good_words, username, finishAction }) => {
    const [isAnswersChecked, setIsAnswersChecked] = useState(false)
    const [selectedWords, setSelectedWords] = useState([])
    const [summary, setSummary] = useState(null)

    const isSelected = (word) => selectedWords.some(item => item === word)

    const toggleWord = (word) => {
        if (isSelected(word)) {
            setSelectedWords(selectedWords.filter(item => item !== word))
        } else {
            setSelectedWords([...selectedWords, word])
        }
    }

    const isCorrectAnswer = (word) => {
        if (good_words.some(item => item === word) && isSelected(word)) {
            return 'success'
        }

        if (isSelected(word) && good_words.some(item => item !== word)) {
            return 'failed'
        }

        return ''
    }

    const checkScore = () => {
        let goodCounter = 0
        let badCounter = 0

        good_words.forEach(word => {
            if (selectedWords.includes(word)) {
                goodCounter++
            } else {
                badCounter++
            }
        })

        selectedWords.forEach(word => {
            if (!good_words.includes(word)) {
                badCounter++
            } 
        })

        setSummary(goodCounter * 2 - badCounter)
    }

    if (summary) {
        return (
            <div className='wrapper summary'>
                <h3>
                    Congratulations, { username }! <br />
                    Your score:
                </h3>
                <span>
                    { summary } points
                </span>
                <Button onClick={() => finishAction()} text="play again" />
            </div>
        )
    }
    
    return (
        <div className="wrapper">
            <h4>
                { question.charAt(0).toUpperCase() + question.slice(1) }
            </h4>
            <div className="items">
                {words.map((word, i) => (
                    <button 
                        key={i} 
                        className={`word ${isAnswersChecked ? isCorrectAnswer(word) : isSelected(word) ? 'selected' : ''}`}
                        onClick={(e) => toggleWord(e.target.innerHTML)}
                        disabled={isAnswersChecked}
                        style={{marginLeft: `${i * 2.5 + 10}px`, marginRight: `${i * 3.5 + 25}px`}}
                    >
                        { word }
                    </button>
                ))}
            </div>
            {isAnswersChecked
                ? <Button onClick={() => checkScore()} text="finish game" />
                : <Button onClick={() => setIsAnswersChecked(true)} text="check answers" />
            }
            
        </div>
    )
}

export default Game