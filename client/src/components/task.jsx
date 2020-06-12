import React from 'react';
import { Link } from 'react-router-dom';

const Task = (props) => {
  function getLevelWithBadge(level) {
    if (level === 'Normal') {
      return <span className="badge badge-primary">{level}</span>;
    }
    if (level === 'Middle') {
      return <span className="badge badge-warning">{level}</span>;
    }
    if (level === 'Urgent') {
      return <span className="badge badge-danger">{level}</span>;
    }
  }
  return (
    <tr>
      <td>{props.task.description}</td>
      {/* <td>{props.task.level}</td> */}

      <td>{getLevelWithBadge(props.task.level)}</td>
      <td>{props.task.dueDate.substring(0, 10)}</td>
      <td>
        <Link
          to={'/tasks/update/' + props.task._id}
          //   onClick={() => props.deleteTask(props.task._id)}
          className="btn btn-warning btn-sm mr-3"
        >
          Edit
        </Link>
        <button
          href=""
          onClick={() => props.deleteTask(props.task._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

// const getLevelWithBadge = (level) => {
//   if (level === 'Normal') {
//     return <span class="badge badge-primary">{level}</span>;
//   } else if (level === 'Middle') {
//     <span class="badge badge-warning">{level}</span>;
//   } else {
//     <span class="badge badge-danger">{level}</span>;
//   }
// };

export default Task;
