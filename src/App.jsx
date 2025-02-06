import { useState } from 'react'
import './App.css'

import InputForm from './components/InputForm';
import List from './components/List';
import Results from './components/Results';

function App() {
  const [habits, setHabits] = useState({});
  const [entries, countEntries] = useState(0);

  return (
    <>
      <InputForm habits={habits} setHabits={setHabits} entries={entries} countEntries={countEntries} />
      <List habits={habits} setHabits={setHabits} />
      <Results habits={habits} />
    </>
  )
}

export default App