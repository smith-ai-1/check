import React from 'react';
import { Trash } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => void;
  entityType: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, entityType }) => (
  <button
    onClick={onDelete}
    className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
  >
    <Trash className="h-5 w-5" />
    <span>Delete {entityType}</span>
  </button>
);

export default DeleteButton;
