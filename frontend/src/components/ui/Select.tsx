import React, { useState, useRef, useEffect } from 'react';
import './ui.css';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectChangeEvent {
  target: {
    value: string | number;
    name?: string;
  };
}

export interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string | number;
  onChange?: (e: SelectChangeEvent) => void;
  name?: string;
  disabled?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder = '-- Chọn --',
  value,
  onChange,
  name,
  disabled = false,
  rounded = 'md',
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: option.value, name } });
    }
  };

  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group" ref={containerRef}>
      {label && <label htmlFor={selectId} className="form-label">{label}</label>}

      <div className="custom-select-wrapper">
        <div
          id={selectId}
          className={`custom-select-trigger select-rounded-${rounded} ${error ? 'is-error' : ''} ${disabled ? 'is-disabled' : ''} ${isOpen ? 'is-open' : ''} ${className}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className={selectedOption ? 'selected-text' : 'placeholder-text'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={`select-arrow ${isOpen ? 'open' : ''}`}>▾</span>
        </div>

        {isOpen && (
          <div className="custom-select-dropdown select-rounded-md">
            {options.map((option) => (
              <div
                key={String(option.value)}
                className={`custom-select-option ${option.value === value ? 'is-selected' : ''} ${option.disabled ? 'is-disabled' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <span className="form-error">{error}</span>
      ) : helperText ? (
        <span className="form-helper">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Select;
