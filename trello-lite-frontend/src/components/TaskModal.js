import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../features/tasks/taskSlice';

const TaskModal = ({ onClose, editData = null }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [task, setTask] = useState(
    editData || {
      title: '',
      description: '',
      status: 'To Do',
      dueDate: '',
    }
  );

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (editData) {
    const { userId, _id, __v, createdAt, updatedAt, ...cleanedTask } = task;
    await dispatch(updateTask({ task: cleanedTask, token, id: _id }));
  } else {
    await dispatch(createTask({ task, token }));
  }
  onClose();
};

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.box}>
        <h3>{editData ? 'Edit Task' : 'Create Task'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />
          <br />
          <select name="status" value={task.status} onChange={handleChange}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <br />
          <input
            name="dueDate"
            type="date"
            value={task.dueDate?.slice(0, 10)}
            onChange={handleChange}
          />
          <br />
          <button type="submit">{editData ? 'Update' : 'Add'} Task</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
};

export default TaskModal;
