import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
}

const StatisticsLine = ({ label, value }) => {
  return (
    <tr>
      <td><strong>{label}:</strong></td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;

  if (all === 0) {
    return (
      <div id="stats">
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    );
  } else {
    const average = (good - bad) / all;
    const positive = Math.floor((good / all) * 10000) / 100;

    return (
      <div id="stats">
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticsLine label="Good" value={good} />
            <StatisticsLine label="Neutral" value={neutral} />
            <StatisticsLine label="Bad" value={bad} />
            <StatisticsLine label="All" value={all} />
            <StatisticsLine label="Average" value={average} />
            <StatisticsLine label="Positive" value={positive + '%'} />
          </tbody>
        </table>
      </div>
    );
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <div>
      <h1>Give Feedback</h1>
      <div id="buttons">
        <Button text="Good" onClick={() => setGood(good + 1)} />
        <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" onClick={() => setBad(bad + 1)} />
      </div>

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </div>
  );
}

export default App;