function Card({ habit, editable, onDelete, onEdit, onCancel, onUpdate }) {
    const staticCard = 
    <>
    <p>{habit.name} for {habit.duration} minutes {habit.frequency} days per week</p>
    
    {habit.notes && <details>
      <summary>Notes</summary>
      {habit.notes}
    </details>}
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
      <form data-id="hi" onSubmit={(e) => onUpdate(e)}>
        <input type="text" name="name" defaultValue={habit.name} id="" />
        <input type="number" name="duration" min="5" step="5" defaultValue={habit.duration} id="" required />
        <select name="frequency" id="" required>
            {optionList}
        </select>
        <input type="text" name="notes" defaultValue={habit.notes} id="" />
        <button onClick={onCancel}>Cancel</button>
        <button>Update</button>
      </form>;
    
    return (
      <>{editable ? editableCard : staticCard}</>
    )
  }

  export default Card;