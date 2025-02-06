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
  const [habits, setHabits] = useState({});
  const [entries, countEntries] = useState(0);

  return (
    <>
      <InputForm state={habits} updateState={setHabits} entries={entries} countEntries={countEntries} />
      <List state={habits} updateState={setHabits} />
      <Results habits={habits} />
    </>
  )
}

function InputForm({ state, updateState, entries, countEntries}) {
  function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson.created = entries;
    formJson.id = hashCode(String(formJson.created));
    
    for (const habit in state) {
      if (state[habit].name.toLowerCase() == formJson.name.toLowerCase()) return;
    }

    countEntries(entries + 1);
    updateState({...state, [formJson.id]: formJson});
  }

  return (
    <>
    <h2>Create New Habit</h2>

    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Habit Name:
        <input type="text" name="name" placeholder="Habit Name" id="" required />
      </label>
      <label htmlFor="amount">
        Amount:
        <input type="number" name="amount" min="5" step="5" placeholder="5" id="" required />
      </label>
      <label htmlFor="frequency">
        Frequency:
        <select name="frequency" id="" required>
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

function List({ state, updateState }) {
  const [editFocus, setEditFocus] = useState(null);

  function handleDelete(id) {
    const newState = state;
    delete newState[id];
    updateState({...newState});
  }

  function handleCancel() {
    setEditFocus(null);
  }
  
  function handleEdit(id) {
    setEditFocus(id);
  }

  function handleUpdate(e, id) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    const newState = state;

    for (const habit in state) {
      if (state[habit].name.toLowerCase() == formJson.name.toLowerCase() && state[habit].id !== id) return;
    }

    Object.assign(newState[id], formJson);
    
    setEditFocus(null);
    updateState({...newState});
  }

  const items = [];

  for (const habit in state) {
    items.push(
      <li key={habit}>
        <Card habit={state[habit]} editable={editFocus} onDelete={() => handleDelete(habit)} onCancel={handleCancel} onEdit={() => handleEdit(habit)} onUpdate={handleUpdate}/>
      </li>
    )
  }

  return (
    <>
    <h2>List of Habits</h2>
    <ul>
      {items}
    </ul>
    </>
  )
}

function Card({ habit, editable, onDelete, onEdit, onCancel, onUpdate }) {
  const staticCard = 
  <>
  <p>{habit.name} for {habit.amount} minutes {habit.frequency} days per week</p>
  <p>{habit.notes ? "Notes: " + habit.notes : null}</p>
  <button onClick={onEdit}>Edit</button>
  <button onClick={onDelete}>Delete</button>
  </>;

  const freqOptions = [1, 2, 3, 4, 5, 7];
  const optionList = freqOptions.map(n => {
    const textVal = n == 1 ? 'Weekly' : n == 7 ? 'Daily' : `${n} times per week`;
    if (n == habit.frequency) {
      return <option selected key={n} value={n}>{textVal}</option>
    }

    return <option key={n} value={n}>{textVal}</option>
  });
  
  
  const editableCard = 
    <form onSubmit={(e) => onUpdate(e, habit.id)}>
      <input type="text" name="name" defaultValue={habit.name} id="" />
      <input type="number" name="amount" min="5" step="5" defaultValue={habit.amount} id="" required />
      <select name="frequency" id="" required>
          {optionList}
      </select>
      <button onClick={onCancel}>Cancel</button>
      <button>Update</button>
    </form>;
  
  return (
    <>{editable && editable == habit.id ? editableCard : staticCard}</>
  )
}


function Results({ habits }) {
  const [timeframe, setTimeframe] = useState(12);
  const WEEK_TO_MONTH = 13 / 3;
  const WEEK_ADJUST = 365 / 364;
  let sumTime = 0;

  function totalTime(amount, freq, timeframe) {
    return Math.ceil((amount * freq * timeframe * WEEK_TO_MONTH * WEEK_ADJUST) / 60);
  }

  const items = [];

  for (const habit in habits) {
    const time = totalTime(habits[habit].amount, habits[habit].frequency, timeframe);
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

export default App