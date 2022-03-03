import { useState } from "react"
import './styles/Login.css'
import Button from "./Button"

const Login = ({ loginAction }) => {
    const [name, setName] = useState('')

    return (
        <div className="wrapper">
            <h2>Wordcloud game</h2>
            <input 
                value={name} onChange={(e) => setName(e.target.value)} 
                type="text"
                placeholder="Enter your nickname here..." 
            />
            <Button onClick={() => loginAction(name)} text="play" />
        </div>
    )
}

export default Login