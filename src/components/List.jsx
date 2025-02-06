import { useState } from 'react'
import Card from './Card';

function List({ habits, setHabits }) {
  const [editFocus, setEditFocus] = useState(null);

  function handleDelete(id) {
    const newState = habits;
    delete newState[id];
    setHabits({...newState});
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
    
    const newState = habits;

    for (const habit in habits) {
      if (habits[habit].name.toLowerCase() == formJson.name.toLowerCase() && habits[habit].id !== id) return;
    }

    Object.assign(newState[id], formJson);
    
    setEditFocus(null);
    setHabits({...newState});
  }

  const items = [];

  for (const habit in habits) {
    items.push(
      <li key={habit}>
        <Card habit={habits[habit]} editable={editFocus} onDelete={() => handleDelete(habit)} onCancel={handleCancel} onEdit={() => handleEdit(habit)} onUpdate={handleUpdate}/>
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

export default List;