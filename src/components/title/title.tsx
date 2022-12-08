import React, { ElementType, FC } from 'react';
import cx from 'classnames';
import './title.css';

interface ITitleProps {
  Component?: ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Title: FC<ITitleProps> = ({ Component = 'h1', children, className }: ITitleProps) => {
  return (
    <Component className={cx('title', className)}>
      {children}
    </Component>
  );
};

export default Title;
