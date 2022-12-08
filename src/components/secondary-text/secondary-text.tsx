import React, { FC } from 'react';
import cx from 'classnames';
import './secondary-text.css';

interface ISecondaryTextProps {
  className?: string;
  children: React.ReactNode;
}

const SecondaryText: FC<ISecondaryTextProps> = ({ children, className }: ISecondaryTextProps) => {
  return (
    <p className={cx('secondary-text', className)}>
      {children}
    </p>
  );
};

export default SecondaryText;
