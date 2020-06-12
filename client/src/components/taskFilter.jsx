import React, { useState } from 'react';

const TaskFilter = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
    console.log(123);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    // props.search(searchValue);
    resetInputField();
    console.log(222);
  };

  return (
    <form action="" className="form-inline">
      <input
        type="text"
        className="form-control mr-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchValue}
        onChange={handleSearchInputChanges}
      />
      <button
        class="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={callSearchFunction}
      >
        Search
      </button>
    </form>
  );
};

export default TaskFilter;
