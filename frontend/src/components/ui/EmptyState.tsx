import React from 'react';
import './ui.css';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không tìm thấy dữ liệu',
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`state-box ${className}`}>
      <div className="state-icon">{icon || '📭'}</div>
      <h4 className="state-title">{title}</h4>
      {description && <p className="state-desc">{description}</p>}
      {action && <div className="state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
