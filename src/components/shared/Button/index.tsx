import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import './button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  className?: string;
  [arg: string]: any;
};

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { label, className = '', ...restProps },
  ref
) => {
  return (
    <button
      ref={ref}
      className={cx('button rounded-md', { [className]: !!className })}
      {...restProps}
    >
      {label}
    </button>
  );
};

export default forwardRef(Button);
