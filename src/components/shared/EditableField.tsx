import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave(editedValue);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditedValue(value);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={editedValue}
      onChange={(e) => setEditedValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={`w-full px-2 py-1 rounded ${
        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      } ${className}`}
    />
  ) : (
    <span
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded ${className}`}
    >
      {value}
    </span>
  );
};

export default EditableField;
