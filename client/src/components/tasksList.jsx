import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Task from './task';
import AlertContext from '../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [toggleDate, setToggleDate] = useState(true);
  const [levelValue, setLevelValue] = useState('All Levels');
  const alertContext = useContext(AlertContext);
  const [searchValue, setSearchValue] = useState('');

  const { setAlert } = alertContext;
  useEffect(() => {
    axios
      .get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
        setFiltered(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const deleteTask = (id) => {
    if (window.confirm('Are you sure to delete this task?')) {
      axios
        .delete('http://localhost:5000/tasks/' + id)
        .then((response) => console.log(response.data));
      setAlert('Successfully Deleted!', 'danger');
      // setTasks(tasks.filter((el) => el._id !== id));
      setFiltered(tasks.filter((el) => el._id !== id));
    }
  };

  function normalLevelFilter() {
    setFiltered(tasks.filter((task) => task.level === 'Normal'));
    setLevelValue('Normal');
  }

  function middleLevelFilter() {
    setFiltered(tasks.filter((task) => task.level === 'Middle'));
    setLevelValue('Middle');
  }

  function urgentLevelFilter() {
    setFiltered(tasks.filter((task) => task.level === 'Urgent'));
    setLevelValue('Urgent');
  }

  function allLevelFilter() {
    setFiltered(tasks);
    setLevelValue('All Levels');
  }

  function sortDate() {
    setToggleDate(!toggleDate);
    console.log(toggleDate);
    if (toggleDate) {
      setFiltered(
        filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
      );

      console.log(1);
    } else {
      setFiltered(
        filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      );
      console.log(2);
    }
  }

  // filter task
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    resetInputField();
    searchTask(searchValue.toLowerCase());
    console.log(222);
  };

  function searchTask(value) {
    setFiltered(
      tasks.filter((task) => task.description.toLowerCase().includes(value))
    );
  }

  const allTasks = (e) => {
    e.preventDefault();
    setFiltered(tasks);
  };

  // display all tasks
  function tasksList() {
    return filtered.map((task) => {
      return <Task task={task} key={task._id} deleteTask={deleteTask} />;
    });
  }

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th>Description</th>
          <th>
            {levelValue}{' '}
            <FontAwesomeIcon
              icon={faArrowDown}
              className="dropdown-toggle"
              style={{ cursor: 'pointer' }}
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item">
                <span
                  className="badge badge-primary"
                  onClick={normalLevelFilter}
                >
                  Normal
                </span>
              </a>
              <a className="dropdown-item">
                <span
                  className="badge badge-warning"
                  onClick={middleLevelFilter}
                >
                  Middle
                </span>
              </a>
              <a className="dropdown-item">
                <span
                  className="badge badge-danger"
                  onClick={urgentLevelFilter}
                >
                  Urgent
                </span>
              </a>
              <a className="dropdown-item">
                <span className="badge badge-success" onClick={allLevelFilter}>
                  All Level
                </span>
              </a>
            </div>
          </th>
          <th>
            Due Date{' '}
            <FontAwesomeIcon
              icon={faArrowsAltV}
              onClick={sortDate}
              style={{ cursor: 'pointer' }}
            />
          </th>
          <th>
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
                class="btn btn-outline-success my-1 mr-2 my-sm-0"
                type="submit"
                onClick={callSearchFunction}
              >
                Search
              </button>
              <button
                class="btn btn-outline-danger my-1 my-sm-0"
                type="submit"
                onClick={allTasks}
              >
                All Tasks
              </button>
            </form>
          </th>
        </tr>
      </thead>
      <tbody>{tasksList()}</tbody>
    </table>
  );
};

export default TasksList;
