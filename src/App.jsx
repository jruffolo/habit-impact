import { useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([]);

  return (
    <>
      <InputForm state={habits} updateState={setHabits} />
      <HabitList habits={habits} state={habits} updateState={setHabits}/>
    </>
  )
}

function InputForm({ state, updateState }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

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

function HabitList({ habits, state, updateState }) {
  function handleDelete(key) {
    updateState(state.toSpliced(key, 1));
  }

  const items = habits.map((habit, i) => {
    return (
      <li key={i}>
        <HabitCard habit={habit} onDelete={() => handleDelete(i)}/>
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

function HabitCard({ habit, onDelete }) {
  return (
    <>
    <p>{habit.name} for {habit.amount} minutes {habit.frequency} days per week</p>
    <p>{habit.notes}</p>
    <button onClick={onDelete}>Delete</button>
    </>
  )
}

export default App