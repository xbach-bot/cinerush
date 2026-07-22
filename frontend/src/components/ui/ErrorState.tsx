import React from 'react';
import './ui.css';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Đã có lỗi xảy ra',
  message = 'Không thể tải dữ liệu. Vui lòng thử lại sau.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`state-box ${className}`}>
      <div className="state-icon error-state-icon">⚠️</div>
      <h4 className="state-title">{title}</h4>
      {message && <p className="state-desc">{message}</p>}
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
