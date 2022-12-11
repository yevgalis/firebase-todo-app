import { FC, FormEvent, useState } from 'react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { ITask } from '@/types';
import { createTask, updateTask } from '@/api';
import closeIcon from '@/assets/images/close.svg';
import './task-modal.css';

interface IProps {
  task: ITask | null;
  userId: string | null;
  fetchTasks: VoidFunction;
  closeModal: VoidFunction;
}

const TaskModal: FC<IProps> = ({ task, userId, fetchTasks, closeModal }: IProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const onTitleInput = (evt: FormEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    setTitle(value);
  };

  const onDescriptionInput = (evt: FormEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target as HTMLTextAreaElement;
    setDescription(value);
  };

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (!title.trim()) {
      return;
    }

    const data = {
      title,
      description,
      id: task?.id || '',
      createDate: task?.createDate || Date.now(),
      done: task?.done || false,
    };

    setIsLoading(true);
    Promise.resolve()
      .then(() => {
        return task?.id ? updateTask(data) : createTask(data, userId);
      })
      .then(fetchTasks)
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="modal__close-button" type="button" onClick={closeModal} disabled={isLoading}>
          <img className="modal__close-icon" src={closeIcon} alt="Close modal"/>
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {isLoading && <p className="modal__loader">loading...</p>}
          <h2 className="modal__title">{task ? 'Edit task' : 'Create new task'}</h2>
          <fieldset className="modal__fieldset" disabled={isLoading}>
            <Input
              className="modal__input"
              id="title"
              name="title"
              placeholder="Task title"
              value={title}
              onChange={onTitleInput}
            />
            <textarea
              className="modal__textarea"
              id="description"
              name="description"
              rows={2}
              placeholder="Task description..."
              value={description}
              onChange={onDescriptionInput}
            />
            <Button className="modal__button" type="submit">Submit</Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
