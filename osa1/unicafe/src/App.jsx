import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({good, bad, neutral}) => {
    if (good+bad+neutral > 0) { return(
    <div>
        <h2>Statistics</h2>
        <table>
            <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="bad" value={good+bad+neutral}/>
        <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)}/>
        <StatisticLine text="positive" value={good/(good+bad+neutral)*100}/>
            </tbody>
        </table>
    </div>
    ) } else return (
        <p>No feedback given</p>
    )
}

const StatisticLine = ({text, value}) => {
    if (text === 'positive') {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        )
    } else return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [votes, setVotes] = useState([])

    return (
        <div>
            <h2>Give feedback</h2>
            <Button handleClick={() => setGood(good+1)} text="good"/>
            <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
            <Button handleClick={() => setBad(bad+1)} text="bad"/>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App
