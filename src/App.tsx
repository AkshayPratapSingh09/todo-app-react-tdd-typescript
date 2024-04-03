import React from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = React.useState('');
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = React.useState('');

  const onAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(), // Not a great way to generate IDs
        title: taskName,
        isCompleted: false,
      },
    ]);
    setTaskName('');
  };

  const deleteHandler = (taskId: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const editHandler = (taskId: number) => {
    setEditingTaskId(taskId);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTaskTitle(task.title);
    }
  };

  const updateTask = () => {
    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, title: editingTaskTitle } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="task-input">Add Task: </label>
      <input
        id="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={onAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTaskTitle}
                onChange={(e) => setEditingTaskTitle(e.target.value)}
                onBlur={updateTask}
                autoFocus
              />
            ) : (
              <>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => editHandler(task.id)}
                >
                  ✏️
                </span>
                {task.title}
              </>
            )}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => deleteHandler(task.id)}
            >
              {' '}
              ❌
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
