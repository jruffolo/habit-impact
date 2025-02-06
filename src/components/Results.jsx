import { useState } from 'react'

function Results({ habits }) {
  const [timeframe, setTimeframe] = useState(12);
  const WEEK_TO_MONTH = 13 / 3;
  const WEEK_ADJUST = 365 / 364;
  let sumTime = 0;

  function totalTime(duration, freq, timeframe) {
    return Math.ceil((duration * freq * timeframe * WEEK_TO_MONTH * WEEK_ADJUST) / 60);
  }

  const items = [];

  for (const habit in habits) {
    const time = totalTime(habits[habit].duration, habits[habit].frequency, timeframe);
    sumTime += time;
    items.push(<li key={habit}>{habits[habit].name}: {time} hours</li>);
  }

  return (
    <>
    <h2>Habit Checkout</h2>
    <label htmlFor="timeframe">
        Timeframe:
        <select onChange={(e) => setTimeframe(e.target.value)} name="timeframe" id="">
        <option value="1">1 month</option>
        <option value="2">2 months</option>
        <option value="3">3 months</option>
        <option value="6">6 months</option>
        <option value="12" selected>1 year</option>
        <option value="24">2 years</option>
        <option value="36">3 years</option>
        <option value="60">5 years</option>
      </select>
      </label>
    <ul>
      {items}
    </ul>
    <p>Total time spent toward your goals: {Math.ceil(sumTime)} hours!</p>
    </>
  )
}

export default Results;