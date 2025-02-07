import { useState, useEffect } from 'react'
import './App.css'

import InputForm from './components/InputForm';
import List from './components/List';
import Results from './components/Results';

function App() {
  const [habits, setHabits] = useState([]);
  const [entries, countEntries] = useState(0);
  const [sortField, setSortField] = useState('created');
  const [sortDir, setSortDir] = useState('asc');
  
  let sortedHabits = habits;
  sortedHabits.sort((a, b) => a[sortField] - b[sortField] || a.duration - b.duration || a.frequency - b.frequency);

  if (sortDir !== 'asc') sortedHabits.reverse();
  
  return (
    <>
      <InputForm habits={sortedHabits} setHabits={setHabits} entries={entries} countEntries={countEntries} />
      <List habits={sortedHabits} setHabits={setHabits} setSortField={setSortField} setSortDir={setSortDir} />
      <Results habits={sortedHabits} />
    </>
  )
}

export default App