const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <form>
      <label>filter on name:</label>
      <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </form>
  );
};

export default Filter;