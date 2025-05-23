import React, { useEffect, useState } from 'react';
import TaskModal from '../components/TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '../features/tasks/taskSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { list: tasks, loading } = useSelector((state) => state.tasks);

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(fetchTasks(token));
    }
  }, [dispatch, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleTaskClick = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

 const handleDrop = (e, newStatus) => {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text/plain');
  const task = tasks.find((t) => t._id === taskId);
  if (task && task.status !== newStatus) {
    const { _id, userId, __v, createdAt, updatedAt, ...cleanedTask } = task;
    const updatedTask = { ...cleanedTask, status: newStatus };
    dispatch(updateTask({ task: updatedTask, token, id: _id }));
  }
};


  const renderColumn = (status) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, status)}
      style={{
        flex: 1,
        padding: '1rem',
        border: '1px solid #ccc',
        minHeight: '250px',
        backgroundColor: '#f3f3f3',
      }}
    >
      <h3>{status}</h3>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div
            key={task._id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', task._id)}
            onClick={() => handleTaskClick(task)}
            style={{
              margin: '0.5rem 0',
              padding: '0.5rem',
              border: '1px solid #aaa',
              cursor: 'grab',
              backgroundColor: '#fff',
            }}
          >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <small>Due: {task.dueDate?.slice(0, 10)}</small>
          </div>
        ))}
    </div>
  );

  return (
    <div>
      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          editData={editTask}
        />
      )}

      <h2 style={{ textAlign: 'center' }}>Task Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{ float: 'right', marginRight: '1rem' }}
      >
        Logout
      </button>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button
              onClick={() => {
                setEditTask(null);
                setShowModal(true);
              }}
            >
              + New Task
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            {['To Do', 'In Progress', 'Completed'].map(renderColumn)}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
