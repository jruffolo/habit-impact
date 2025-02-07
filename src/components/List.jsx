import { useState } from 'react'
import Card from './Card';

function List({ habits, setHabits, setSortField, setSortDir }) {
  const [editFocus, setEditFocus] = useState(null);

  function handleDelete(index) {
    setHabits(habits.toSpliced(index, 1));
  }

  function handleCancel() {
    setEditFocus(null);
  }
  
  function handleEdit(index) {
    setEditFocus(index);
  }

  function handleUpdate(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson.totalTime = formJson.duration * formJson.frequency;
    const newState = habits;

    for (let i = 0; i < habits.length; i++) {
      if (i !== editFocus && habits[i].name.toLowerCase() == formJson.name.toLowerCase()) return;
    }

    Object.assign(newState[editFocus], formJson);
    
    setEditFocus(null);
    setHabits([...newState]);
  }

  const items = [];

  for (let i = 0; i < habits.length; i++) {
    items.push(
      <li key={i}>
        <Card habit={habits[i]} editable={i == editFocus} onDelete={() => handleDelete(i)} onCancel={handleCancel} onEdit={() => handleEdit(i)} onUpdate={handleUpdate}/>
      </li>
    )
  }

  return (
    <>
    <h2>List of Habits</h2>
    <label htmlFor="sortMethod">
      Sort by:
      <select onChange={(e) => setSortField(e.target.value)} name="sortMethod" id="">
        <option value="created">Created</option>
        <option value="duration">Duration</option>
        <option value="frequency">Frequency</option>
        <option value="totalTime">Total Time</option>
      </select>
    </label>
    <select onChange={(e) => setSortDir(e.target.value)} name="sortDirection" id="">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <ul>
      {items}
    </ul>
    </>
  )
}

export default List;