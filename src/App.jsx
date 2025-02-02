import { useState } from 'react'
import './App.css'

function hashCode(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for(let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function App() {
  const [habits, setHabits] = useState([]);

  return (
    <>
      <InputForm state={habits} updateState={setHabits} />
      <List habits={habits} state={habits} updateState={setHabits}/>
      <Results habits={habits} />
    </>
  )
}

function InputForm({ state, updateState }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const hash = hashCode(formJson.name.toLowerCase());
    
    for (const habit of state) {
      if (habit.hash == hash) {
        console.log('Entry already exists with that name');
        return;
      }
    }

    formJson.hash = hash;
    updateState([...state, formJson]);
  }

  return (
    <>
    <h2>Create New Habit</h2>

    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Habit Name:
        <input type="text" name="name" placeholder="Habit Name" id="" />
      </label>
      <label htmlFor="amount">
        Amount:
        <input type="number" name="amount" min="5" step="5" placeholder="5" id="" />
      </label>
      <label htmlFor="frequency">
        Frequency:
        <select name="frequency" id="">
        <option value="">Select a frequency</option>
        <option value="7">Daily</option>
        <option value="5">5 times per week</option>
        <option value="4">4 times per week</option>
        <option value="3">3 times per week</option>
        <option value="2">2 times per week</option>
        <option value="1">Weekly</option>
      </select>
      </label>
      <label htmlFor="name">
        Notes:
        <input type="textarea" name="notes" placeholder="" id="" />
      </label>
      <button>Create New</button>
    </form>
    </>
  )
}

function List({ habits, state, updateState }) {
  function handleDelete(key) {
    updateState(state.toSpliced(key, 1));
  }

  const items = habits.map((habit, i) => {
    return (
      <li key={i}>
        <Card habit={habit} onDelete={() => handleDelete(i)}/>
      </li>
    )
  });

  return (
    <>
    <h2>List of Habits</h2>
    <ul>
      {items}
    </ul>
    </>
  )
}

function Card({ habit, onDelete }) {
  return (
    <>
    <p>{habit.name} for {habit.amount} minutes {habit.frequency} days per week</p>
    <p>{habit.notes}</p>
    <button onClick={onDelete}>Delete</button>
    </>
  )
}

function Results({ habits }) {
  const [timeframe, setTimeframe] = useState(12);
  const WEEK_TO_MONTH = 13 / 3;
  const WEEK_ADJUST = 365 / 364;
  let sumTime = 0;

  function totalTime(amount, freq, timeframe) {
    const minutes = amount * freq * timeframe * WEEK_TO_MONTH * WEEK_ADJUST;
    return Math.ceil(minutes / 60);
  }

  const items = habits.map((habit, i) => {
    const time = totalTime(habit.amount, habit.frequency, timeframe);
    sumTime += time;
    return <li key={i}>{habit.name}: {time} hours</li>
  })

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
    <p>Total time spent toward your goals: {sumTime} hours!</p>
    </>
  )
}

export default App