import { FC, FormEvent, useState } from 'react';
import cx from 'classnames';
import { ITask } from '@/types';
import './task-item.css';

interface IProps {
  task: ITask;
  toggleTask: (evt: FormEvent<HTMLInputElement>) => void;
  editTask: VoidFunction;
  deleteTask: VoidFunction;
}

const TaskItem: FC<IProps> = ({ task, toggleTask, editTask, deleteTask }: IProps) => {
  const [disabledControl, setDisabledControl] = useState(false);

  const onDeleteTaskClick = () => {
    setDisabledControl(true);
    deleteTask();
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-item__checkbox"
        id={task.id}
        checked={task.done}
        onChange={toggleTask}
      />
      <label className="task-item__info" htmlFor={task.id}>
        <h3 className={cx('item-task__title', task.done && 'item-task__title--checked')}>
          {task.title}
        </h3>
        {task.description && <p className="item-task__description">{task.description}</p>}
      </label>
      <div className="task-item__controls">
        <button
          className="task-item__control-btn"
          type="button"
          onClick={editTask}
          disabled={disabledControl || task?.done}
        >
          <img className="task-item__control-icon" src={require('../../assets/images/pen.svg')} alt="Edit task"/>
        </button>
        <button
          className="task-item__control-btn"
          type="button"
          onClick={onDeleteTaskClick}
          disabled={task?.done}
        >
          <img className="task-item__control-icon" src={require('../../assets/images/trash.svg')} alt="Delete task"/>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
