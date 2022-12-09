import { ButtonHTMLAttributes, FC } from 'react';
import cx from 'classnames';
import './button.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  className?: string;
}

const Button: FC<IButtonProps> = ({ children, variant, className, ...restProps }: IButtonProps) => {
  return (
    <button
      className={cx(
        'button',
        variant && `button--${variant}`,
        className
      )}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
