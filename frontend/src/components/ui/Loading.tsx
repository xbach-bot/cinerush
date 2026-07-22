import React from 'react';
import './ui.css';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  text,
  className = '',
}) => {
  return (
    <div className={`loading-wrapper ${fullScreen ? 'fullscreen' : ''} ${className}`}>
      <div className={`spinner spinner-${size}`} aria-label="Loading spinner" />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
