import { useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([]);

  return (
    <>
      <InputForm state={habits} updateState={setHabits} />
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
      <button>Create New</button>
    </form>
  )
}

function HabitList() {
  return (
    <>
    
    </>
  )
}

export default App