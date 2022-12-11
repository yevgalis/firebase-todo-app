import React, { FormEvent, useEffect, useState } from 'react';
import TaskModal from '@/components/task-modal/task-modal';
import Button from '@/components/button/button';
import TaskItem from '@/components/task-item/task-item';
import { useAuth } from '@/authContext';
import { deleteTask, getTasks, updateTask } from '@/api';
import { ITask } from '@/types';
import './tasks.css';

const TIMER_DURATION = 2000;

const Tasks = () => {
  const { user } = useAuth();
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [hasTaskModal, setHasTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
  const [timers, setTimers] = useState<any>({});

  const fetchTasks = async () => {
    if (user) {
      const data: ITask[] = await getTasks(user.uid);
      setTaskList(data);
    }
  };

  const clearTimer = (id: string) => {
    clearTimeout(timers[id]);
    timers[id] = null;
  };

  const onEditTaskClick = (task: ITask) => {
    setTaskToEdit(task);
    setHasTaskModal(true);
  };

  const onDeleteTaskClick = async (taskId: string) => {
    clearTimer(taskId);
    await deleteTask(taskId);
    await fetchTasks();
  };

  const onTaskToggle = (evt: FormEvent<HTMLInputElement>) => {
    const { id, checked } = evt.target as HTMLInputElement;
    const task = taskList.find((item) => item.id === id);

    clearTimer(id);
    setTaskList((prevList) => {
      return prevList.map((item) => (item.id === id ? { ...item, done: checked } : item));
    });

    if (checked && task) {
      const timerId = setTimeout(async () => {
        await updateTask({ ...task, done: checked });
        await fetchTasks();
      }, TIMER_DURATION);
      setTimers({ ...timers, [id]: timerId });
    }
  };

  const closeModal = () => {
    setHasTaskModal(false);
    setTaskToEdit(null);
  };

  const onCreateTaskClick = () => {
    setHasTaskModal(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      {hasTaskModal && (
        <TaskModal
          task={taskToEdit}
          userId={user?.uid || null}
          fetchTasks={fetchTasks}
          closeModal={closeModal}
        />
      )}
      <header className="header">
        <h1 className="header__title">Hello, tiger 👋</h1>
        <p className="header__status">You have {taskList.length} tasks</p>
      </header>
      <main className="content">
        <Button className="content__add-button" onClick={onCreateTaskClick}>
          + Add task
        </Button>
        {taskList.length > 0 ? (
          <ul className="task-list">
            {taskList.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={onTaskToggle}
                editTask={() => onEditTaskClick(task)}
                deleteTask={() => onDeleteTaskClick(task.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="tasks__empty-list">
            You don&apos;t have any tasks! Let&apos;s create the first one 🚀
          </p>
        )}
      </main>
    </div>
  );
};

export default Tasks;
