import { useState } from 'react'
import './App.css'

const Header = ({text})=>{
  return (
    <h2>{text}</h2>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )

}
const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad;

  if(total === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <table>
        <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={`${(good - bad) / total} %`} />
        <StatisticLine text="Prositive" value={`${good / total * 100} %`} />
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseGood = () => {
    setGood(good + 1);
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }

  const increaseBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" handleClick={increaseGood} />
      <Button text="Neutral" handleClick={increaseNeutral} />
      <Button text="Bad" handleClick={increaseBad} />
      
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
