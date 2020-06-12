import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import AlertContext from '../context/alert/alertContext';

const EditTask = (props) => {
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  useEffect(() => {
    axios
      .get('http://localhost:5000/tasks/' + props.match.params.id)
      .then((response) => {
        setDescription(response.data.description);
        setLevel(response.data.level);
        setDueDate(new Date(response.data.dueDate));
      })
      .catch(function (error) {
        console.log(error);
      });
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
    console.log(task.dueDate);

    axios
      .post('http://localhost:5000/tasks/update/' + props.match.params.id, task)
      .then((res) => console.log(res.data));
    setAlert('Update Successfully', 'success');

    props.history.push('/');
    //window.location.assign('/');
  };

  return (
    <div>
      <h3>Edit Task</h3>
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
            <DatePicker selected={dueDate} onChange={onChangeDueDate} />
          </div>
        </div>

        {/* sumbit button */}
        <div className="form-group">
          <input type="submit" value="Edit Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
