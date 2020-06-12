import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CreateTask = (props) => {
  let history = useHistory();
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Normal');
  const [dueDate, setDueDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState(new Date());

  useEffect(() => {
    setDisabledDates(Date.now() - 1);
  }, []);

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onChangeDueDate = (date) => {
    setDueDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const task = {
      description,
      level,
      dueDate,
    };
    console.log(task);

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    axios
      .post('http://localhost:5000/tasks/add', task)
      .then((res) => console.log(res.data));
    //props.history.push('/');
    //<Redirect to="/" />;
    history.push('/');
    //window.location.assign('/');
  };

  return (
    <div>
      <h3>Create Task</h3>
      <form onSubmit={onSubmit}>
        {/* description */}
        <div className="form-group">
          <label htmlFor="">Description</label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>

        {/* level */}
        <div className="form-group">
          <label htmlFor="">Level</label>

          <select
            className="form-control"
            onChange={onChangeLevel}
            value={level}
          >
            <option value="Normal">Normal</option>
            <option value="Middle">Middle</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* dueDate */}
        <div className="form-group">
          <label htmlFor="">Due Date: </label>
          <div>
            <DatePicker
              min={disabledDates}
              selected={dueDate}
              onChange={onChangeDueDate}
            />
          </div>
        </div>

        {/* sumbit button */}
        <div className="form-group">
          <input
            type="submit"
            value="Create Task"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
