import { useState } from "react"
import Game from "./Game"
import Login from "./Login"

const Gameboard = ({ games }) => {
    const [user, setUser] = useState(null)
    const [currentGame, setCurrentGame] = useState(null)
    
    const getRandomGame = () => games[Math.floor(Math.random() * games.length)]

    const newGame = (user) => {
        setUser(user)
        setCurrentGame(getRandomGame())
    }

    const finishGame = () => {
        setUser(null)
        setCurrentGame(null)
    }

    if (currentGame) {
        return (
            <section className="container">
                <Game
                    username={user} 
                    question={currentGame.question} 
                    words={currentGame.all_words} 
                    good_words={currentGame.good_words}
                    finishAction={() => finishGame()} 
                />
            </section>
        )
    }

    return (
        <section className="container">
            <Login loginAction={(user) => newGame(user)} />
        </section>
    )
}

export default Gameboard