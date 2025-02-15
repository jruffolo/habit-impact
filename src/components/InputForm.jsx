function InputForm({ habits, setHabits, entries, countEntries}) {
    function handleSubmit(e) {
      e.preventDefault();
      
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      formJson.created = entries;
      formJson.totalTime = formJson.duration * formJson.frequency;
      
      for (const habit of habits) {
        if (habit.name.toLowerCase() == formJson.name.toLowerCase()) return;
      }
  
      countEntries(entries + 1);
      setHabits([...habits, formJson]);
    }
  
    return (
      <>
      <h2>Create New Habit</h2>
  
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Habit Name:
          <input type="text" name="name" placeholder="Habit Name" id="" required />
        </label>
        <label htmlFor="duration">
          Duration:
          <input type="number" name="duration" min="5" step="5" placeholder="5" id="" required />
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

  export default InputForm;