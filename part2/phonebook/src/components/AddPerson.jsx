const AddPerson = ({ newName, newPhone, handleNameChange, handlePhoneChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <label>name: </label>
      <input
        value={newName}
        onChange={handleNameChange}
      />
      <br />
      <label>phone: </label>
      <input
        value={newPhone}
        onChange={handlePhoneChange}
      />
      <br />
      <button type="submit">add</button>
    </form>
  );
};

export default AddPerson;