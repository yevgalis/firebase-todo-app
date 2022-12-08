import { FC, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import './input.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<IInputProps> = ({ className, ...restProps }: IInputProps) => {
  return (
    <div>
      <input
        className={cx('input', className)}
        type="text" {...restProps}
      />
    </div>
  );
};

export default Input;
